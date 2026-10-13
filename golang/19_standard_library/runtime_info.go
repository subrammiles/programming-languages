package main

import (
	"fmt"
	"runtime"
)

/*
runtime - information about the Go runtime
*/

func runtimeInfo() {
	fmt.Println("CPUs:", runtime.NumCPU())
	fmt.Println("goroutines:", runtime.NumGoroutine())
	fmt.Println("GOMAXPROCS:", runtime.GOMAXPROCS(0)) // threads running Go code at once
	fmt.Println("OS/arch:", runtime.GOOS, runtime.GOARCH)
	fmt.Println("Go version:", runtime.Version())
	var m runtime.MemStats
	runtime.ReadMemStats(&m)
	fmt.Println("heap in use (KB) > 0:", m.HeapInuse/1024 > 0)
}
