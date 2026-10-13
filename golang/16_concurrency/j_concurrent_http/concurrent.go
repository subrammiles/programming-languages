package main

import (
	"fmt"
	"sync"
)

/*
The same calls in parallel: each runs in a goroutine and sends its result on a channel.
Total time ≈ the slowest call. Results arrive in any order, so we key them by URL.
*/

type response struct {
	url  string
	body string
	err  error
}

func concurrentCalls(urls []string) {
	results := make(chan response, len(urls))
	var wg sync.WaitGroup
	for _, url := range urls {
		wg.Go(func() {
			body, err := getBody(url)
			results <- response{url, body, err}
		})
	}
	wg.Wait()
	close(results)

	byURL := map[string]string{}
	for r := range results {
		if r.err != nil {
			fmt.Println("error:", r.err)
			continue
		}
		byURL[r.url] = r.body
	}
	for _, url := range urls { // print in the original order
		fmt.Println(byURL[url])
	}
}
