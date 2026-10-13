package main

import (
	"cmp"
	"fmt"
	"strconv"
)

/*
Generics (Go 1.18): write a function once for many types.
	func Max[T cmp.Ordered](a, b T) T
 [T constraint]  a TYPE PARAMETER; the constraint says what T must support
 any             no requirements
 comparable      supports == and !=
 cmp.Ordered     supports < <= > >= (ints, floats, strings)
Go usually infers T from the arguments, so you rarely write Max[int](1, 2).
*/

func Max[T cmp.Ordered](a, b T) T {
	if a > b {
		return a
	}
	return b
}

func Map[T, U any](items []T, f func(T) U) []U {
	out := make([]U, 0, len(items))
	for _, item := range items {
		out = append(out, f(item))
	}
	return out
}

func Filter[T any](items []T, keep func(T) bool) []T {
	var out []T
	for _, item := range items {
		if keep(item) {
			out = append(out, item)
		}
	}
	return out
}

func Reduce[T, A any](items []T, initial A, f func(A, T) A) A {
	acc := initial
	for _, item := range items {
		acc = f(acc, item)
	}
	return acc
}

func IndexOf[T comparable](items []T, target T) int {
	for i, item := range items {
		if item == target {
			return i
		}
	}
	return -1
}

func genericFunctions() {
	fmt.Println(Max(3, 7), Max(2.5, 1.5), Max("go", "rust")) // 7 2.5 rust
	fmt.Println(Max[float64](3, 7.5))                        // explicit type: 7.5

	nums := []int{1, 2, 3, 4, 5, 6}
	evens := Filter(nums, func(n int) bool { return n%2 == 0 })
	labels := Map(evens, func(n int) string { return "#" + strconv.Itoa(n) })
	sum := Reduce(nums, 0, func(acc, n int) int { return acc + n })
	fmt.Println(evens, labels, sum) // [2 4 6] [#2 #4 #6] 21

	fmt.Println(IndexOf([]string{"a", "b", "c"}, "c")) // 2
}
