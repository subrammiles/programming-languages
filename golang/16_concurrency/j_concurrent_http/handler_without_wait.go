package main

import (
	"fmt"
	"net/http"
)

/*
A bug: the HTTP handler starts goroutines but returns BEFORE they finish,
so the response is sent without their results.
*/

func handlerWithoutWait(urls []string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		statuses := make([]string, len(urls))
		for i, url := range urls {
			go func() {
				if body, err := getBody(url); err == nil {
					statuses[i] = body // also a data race with the read below
				}
			}()
		}
		fmt.Fprintf(w, "results: %q", statuses) // usually all empty
	}
}
