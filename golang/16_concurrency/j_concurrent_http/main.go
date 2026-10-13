// Concurrent HTTP calls.
//
//	go run ./16_concurrency/j_concurrent_http
//
// To work offline and give the same results every run, this starts a local
// test server (net/http/httptest) whose endpoints take 200ms each.
// The original examples called public APIs; swap in real URLs to try them.
package main

import (
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"time"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

func main() {
	api := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(200 * time.Millisecond) // a slow API
		fmt.Fprintf(w, `{"path": %q}`, r.URL.Path)
	}))
	defer api.Close()
	urls := []string{api.URL + "/users/1", api.URL + "/users/2", api.URL + "/users/3"}

	timed := func(f func()) func() {
		return func() {
			start := time.Now()
			f()
			fmt.Println("took", time.Since(start).Round(50*time.Millisecond))
		}
	}

	serve := func(h http.HandlerFunc) func() {
		return func() {
			srv := httptest.NewServer(h)
			defer srv.Close()
			body, _ := getBody(srv.URL)
			fmt.Println(body)
			_ = io.Discard
		}
	}

	examples.Run([]examples.Example{
		{Name: "sequential calls", Run: timed(func() { sequentialCalls(urls) })},   // ~600ms
		{Name: "concurrent calls", Run: timed(func() { concurrentCalls(urls) })},   // ~200ms
		{Name: "handler without wait (bug)", Run: serve(handlerWithoutWait(urls))}, // results: ["" "" ""]
		{Name: "handler with WaitGroup", Run: serve(handlerWithWaitGroup(urls))},
	})
}
