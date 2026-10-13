package main

import (
	"fmt"
	"log"
	"net/http"
)

var urls = []string{
	"https://google.com",
	"https://tutorialedge.net",
	"https://twitter.com",
}

func fetch(url string) {
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(resp.Status)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("HomePage Endpoint Hit")
	for _, url := range urls {
		go fetch(url)
	}
	fmt.Println("Returning Response")
	fmt.Fprintf(w, "All Responses Received")
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	log.Fatal(http.ListenAndServe(":9081", nil))
}

func main() {
	handleRequests()
}

/*
endpoint were returning before my goroutines had a chance to complete and populate the results.

This is where I learned of WaitGroups and dived deeper into the sync package.

By employing a WaitGroup I could effectively fix this unexpected behavior, and only return the results once all of my goroutines had finished.
*/
