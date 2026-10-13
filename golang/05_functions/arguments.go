package main

import "fmt"

/*
Any type can be a parameter: ints, strings, slices, maps, structs, channels, functions.
All arguments are passed BY VALUE (copied). Slices, maps and channels contain
pointers internally, so a function CAN change their contents (see call_by_value.go).
*/

func withInt(n int)            { fmt.Println("int:", n) }
func withString(s string)      { fmt.Println("string:", s) }
func withSlice(values []int)   { fmt.Println("slice:", values) }
func withMap(m map[int]string) { fmt.Println("map:", m) }
func withStruct(p struct {
	name string
	age  int
}) {
	fmt.Println("struct:", p)
}

// <-chan int means "receive-only channel"
func withChannel(ch <-chan int) {
	for v := range ch {
		fmt.Println("from channel:", v)
	}
}

func argumentTypes() {
	withInt(2)
	withString("Subbu")
	withSlice([]int{1, 2, 3})
	withMap(map[int]string{1: "subbu", 2: "gabbu"})
	withStruct(struct {
		name string
		age  int
	}{name: "subbu", age: 12})

	ch := make(chan int)
	go func() {
		for _, v := range []int{100, 1000, 10000} {
			ch <- v
		}
		close(ch) // lets the range loop in withChannel finish
	}()
	withChannel(ch)
}
