package main

import (
	"fmt"
	"sync"
)

func mygoroutine1(myWaitGroup *sync.WaitGroup) {
	fmt.Println("Subbu")
	myWaitGroup.Done()
}

func mygoroutine2(myWaitGroup *sync.WaitGroup) {
	fmt.Println("Trump")
	myWaitGroup.Done()
}
func main() {
	var myWaitGroup sync.WaitGroup
	myWaitGroup.Add(2)
	go mygoroutine1(&myWaitGroup)
	go mygoroutine2(&myWaitGroup)
	myWaitGroup.Wait()
	fmt.Println("Main Function Go Routine")
}
