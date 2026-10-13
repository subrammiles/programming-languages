package main

import (
	"fmt"
	"io"
	"net/http"
)

/*
Calling HTTP APIs one after another: total time = the sum of every call.
(io.ReadAll replaces the old ioutil.ReadAll, which is deprecated.)
*/

func getBody(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close() // always close the body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}

func sequentialCalls(urls []string) {
	for _, url := range urls {
		body, err := getBody(url)
		if err != nil {
			fmt.Println("error:", err)
			continue
		}
		fmt.Println(body)
	}
}
