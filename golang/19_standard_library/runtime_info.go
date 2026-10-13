package main

import (
	"fmt"
	"runtime"
)

func main() {
	/*Prints number of CPUs in the system.*/
	fmt.Println(runtime.NumCPU())

	fmt.Println(runtime.NumGoroutine())
}
