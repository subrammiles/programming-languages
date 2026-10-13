// select waits on several channel operations and runs whichever is ready first.
//
//	go run ./16_concurrency/f_select
//
//	select {
//	case v := <-a:           // a is ready
//	case b <- x:             // we can send on b
//	case <-time.After(1*time.Second): // timeout
//	default:                 // nothing ready: don't block
//	}
package main

import (
	"fmt"
	"time"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

func after(d time.Duration, msg string) <-chan string {
	ch := make(chan string, 1)
	go func() {
		time.Sleep(d)
		ch <- msg
	}()
	return ch
}

func firstResponse() {
	fast := after(50*time.Millisecond, "mirror 2")
	slow := after(200*time.Millisecond, "mirror 1")
	select {
	case msg := <-fast:
		fmt.Println("first:", msg) // first: mirror 2
	case msg := <-slow:
		fmt.Println("first:", msg)
	}
}

func timeout() {
	select {
	case msg := <-after(500*time.Millisecond, "slow result"):
		fmt.Println(msg)
	case <-time.After(100 * time.Millisecond):
		fmt.Println("timed out") // timed out
	}
}

func nonBlocking() {
	messages := make(chan string)
	select {
	case m := <-messages:
		fmt.Println("got", m)
	default:
		fmt.Println("no message ready, moving on") // default runs immediately
	}
}

func loopOverEvents() {
	ticker := time.NewTicker(40 * time.Millisecond)
	defer ticker.Stop()
	stop := time.After(150 * time.Millisecond)
	for {
		select {
		case t := <-ticker.C:
			fmt.Println("tick at", t.Format("05.000"))
		case <-stop:
			fmt.Println("stop")
			return
		}
	}
}

func main() {
	examples.Run([]examples.Example{
		{Name: "first response wins", Run: firstResponse},
		{Name: "timeout", Run: timeout},
		{Name: "non-blocking with default", Run: nonBlocking},
		{Name: "loop over events", Run: loopOverEvents},
	})
}
