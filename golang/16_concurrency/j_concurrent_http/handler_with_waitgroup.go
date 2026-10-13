package main

import (
	"fmt"
	"net/http"
	"sync"
)

/*
The fix: a WaitGroup makes the handler wait for every fetch before responding.
(The original version called wg.Done() only on success, so an error left the
handler waiting forever; wg.Go always marks the goroutine done.)
*/

func handlerWithWaitGroup(urls []string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		statuses := make([]string, len(urls))
		var wg sync.WaitGroup
		for i, url := range urls {
			wg.Go(func() {
				body, err := getBody(url)
				if err != nil {
					statuses[i] = "error: " + err.Error()
					return
				}
				statuses[i] = body
			})
		}
		wg.Wait()
		fmt.Fprintf(w, "results: %q", statuses)
	}
}
