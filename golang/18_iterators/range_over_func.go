package main

import (
	"fmt"
	"iter"
)

/*
Range over functions (Go 1.23): you can write your own things to use with for-range.
 iter.Seq[V]      func(yield func(V) bool)       for v := range seq
 iter.Seq2[K, V]  func(yield func(K, V) bool)    for k, v := range seq
Call yield for each value; stop if yield returns false (the loop did "break").
*/

func Countdown(from int) iter.Seq[int] {
	return func(yield func(int) bool) {
		for i := from; i > 0; i-- {
			if !yield(i) {
				return // the caller broke out of the loop
			}
		}
	}
}

func Fibonacci() iter.Seq[int] { // infinite: fine, the caller decides when to stop
	return func(yield func(int) bool) {
		a, b := 0, 1
		for {
			if !yield(a) {
				return
			}
			a, b = b, a+b
		}
	}
}

func Enumerate[T any](items []T) iter.Seq2[int, T] {
	return func(yield func(int, T) bool) {
		for i, item := range items {
			if !yield(i, item) {
				return
			}
		}
	}
}

func rangeOverFunctions() {
	for n := range Countdown(3) {
		fmt.Print(n, " ") // 3 2 1
	}
	fmt.Println()

	for f := range Fibonacci() {
		if f > 50 {
			break
		}
		fmt.Print(f, " ") // 0 1 1 2 3 5 8 13 21 34
	}
	fmt.Println()

	for i, s := range Enumerate([]string{"a", "b"}) {
		fmt.Println(i, s)
	}
}
