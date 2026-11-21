// Graceful shutdown: stop a server cleanly when the process gets Ctrl+C (SIGINT) or SIGTERM.
//
//	go run ./16_concurrency/m_graceful_shutdown
//
// What "graceful" means:
//  1. stop accepting new connections
//  2. let in-flight requests finish (with a deadline)
//  3. stop background workers, flush logs, close the database
//
// Docker / Kubernetes send SIGTERM before killing a container, so every server needs this.
//
// To keep the demo self-contained, the program sends SIGINT to ITSELF after a moment.
// Delete sendInterruptSoon() and press Ctrl+C instead to try it by hand.
// (Sending signals to yourself works on Linux and macOS, not on Windows.)
package main

import (
	"context"
	"errors"
	"fmt"
	"net"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"
)

func sendInterruptSoon(after time.Duration) {
	go func() {
		time.Sleep(after)
		p, _ := os.FindProcess(os.Getpid())
		_ = p.Signal(os.Interrupt)
	}()
}

func main() {
	// ctx is cancelled when SIGINT or SIGTERM arrives
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	mux := http.NewServeMux()
	mux.HandleFunc("GET /slow", func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(300 * time.Millisecond) // a request that is still running during shutdown
		fmt.Fprintln(w, "slow request finished")
	})
	listener, err := net.Listen("tcp", "127.0.0.1:0") // port 0: any free port
	if err != nil {
		panic(err)
	}
	server := &http.Server{Handler: mux}

	// A background worker that must stop too
	var workers sync.WaitGroup
	workers.Go(func() {
		ticker := time.NewTicker(100 * time.Millisecond)
		defer ticker.Stop()
		for {
			select {
			case <-ticker.C:
				// periodic work, e.g. flushing metrics
			case <-ctx.Done():
				fmt.Println("worker: stopping")
				return
			}
		}
	})

	go func() {
		if err := server.Serve(listener); err != nil && !errors.Is(err, http.ErrServerClosed) {
			fmt.Println("server error:", err)
		}
	}()
	fmt.Println("server listening")

	// A client request that will still be running when the signal arrives
	responses := make(chan string, 1)
	go func() {
		resp, err := http.Get("http://" + listener.Addr().String() + "/slow")
		if err != nil {
			responses <- "client error: " + err.Error()
			return
		}
		defer resp.Body.Close()
		buf := make([]byte, 64)
		n, _ := resp.Body.Read(buf)
		responses <- "client got: " + string(buf[:n-1])
	}()

	sendInterruptSoon(100 * time.Millisecond)

	<-ctx.Done() // block until a signal arrives
	fmt.Println("signal received, shutting down...")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()
	if err := server.Shutdown(shutdownCtx); err != nil { // waits for in-flight requests
		fmt.Println("forced shutdown:", err)
	}
	workers.Wait()
	fmt.Println(<-responses)
	fmt.Println("shutdown complete")
	// server listening
	// signal received, shutting down...
	// worker: stopping
	// client got: slow request finished      <- the in-flight request was NOT cut off
	// shutdown complete
}
