package main

import "fmt"

/*
An immediately invoked function: defined and called in one go.
Useful to compute a value with a few statements, or to start a goroutine.
*/

func immediatelyInvokedFunction() {
	squareOf2 := func() int {
		return 2 * 2
	}() // the () calls it right away
	fmt.Println(squareOf2) // 4

	config := func() map[string]int {
		m := map[string]int{"port": 8080}
		m["timeout"] = 30
		return m
	}()
	fmt.Println(config)
}
