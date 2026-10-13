package main

import (
	"fmt"
	"sync"
)

/*
sync.WaitGroup waits for a group of goroutines to finish.
 Classic:  wg.Add(n) before starting, defer wg.Done() inside, wg.Wait() to block
 Go 1.25:  wg.Go(func() { ... })  does Add, the go statement and Done for you
Pass a WaitGroup by POINTER if you pass it to a function (copying it is a bug).
*/

func greet(name string, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Println("hello", name)
}

func classicWaitGroup() {
	var wg sync.WaitGroup
	wg.Add(2)
	go greet("Subbu", &wg)
	go greet("Asha", &wg)
	wg.Wait()
	fmt.Println("main: both goroutines finished")
}

func waitGroupGo() {
	var wg sync.WaitGroup
	results := make([]int, 5)
	for i := range 5 {
		wg.Go(func() { // Go 1.25
			results[i] = i * i // each goroutine writes its own index: no data race
		})
	}
	wg.Wait()
	fmt.Println(results) // [0 1 4 9 16]
}
