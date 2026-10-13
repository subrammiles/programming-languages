package main

import (
	"fmt"
	"iter"
	"maps"
	"slices"
	"strings"
)

/*
Iterators compose: write small generic adapters (Filter, Map, Take)
and the values flow through one at a time, without building slices in between.
The standard library returns iterators too: slices.All/Values, maps.Keys/Values,
strings.SplitSeq/Lines, and slices.Collect/Sorted turn them back into slices.
*/

func Filter[V any](seq iter.Seq[V], keep func(V) bool) iter.Seq[V] {
	return func(yield func(V) bool) {
		for v := range seq {
			if keep(v) && !yield(v) {
				return
			}
		}
	}
}

func Map[V, R any](seq iter.Seq[V], f func(V) R) iter.Seq[R] {
	return func(yield func(R) bool) {
		for v := range seq {
			if !yield(f(v)) {
				return
			}
		}
	}
}

func Take[V any](seq iter.Seq[V], n int) iter.Seq[V] {
	return func(yield func(V) bool) {
		if n <= 0 {
			return
		}
		count := 0
		for v := range seq {
			if !yield(v) {
				return
			}
			count++
			if count == n {
				return
			}
		}
	}
}

func composingIterators() {
	evenFibs := Take(Filter(Fibonacci(), func(n int) bool { return n%2 == 0 }), 5)
	fmt.Println(slices.Collect(evenFibs)) // [0 2 8 34 144]

	labels := Map(Countdown(3), func(n int) string { return fmt.Sprintf("T-%d", n) })
	fmt.Println(slices.Collect(labels)) // [T-3 T-2 T-1]
}

func standardLibraryIterators() {
	scores := map[string]int{"ravi": 75, "asha": 92, "meena": 88}
	fmt.Println(slices.Sorted(maps.Keys(scores))) // [asha meena ravi]

	for i, v := range slices.Backward([]string{"a", "b", "c"}) {
		fmt.Print(i, v, " ") // 2c 1b 0a
	}
	fmt.Println()

	for line := range strings.Lines("first\nsecond\n") { // Go 1.24
		fmt.Printf("%q ", line) // "first\n" "second\n"
	}
	fmt.Println()
}

func pullIterators() {
	// iter.Pull turns a "push" iterator into next()/stop() calls,
	// useful to walk two sequences side by side.
	next, stop := iter.Pull(Countdown(3))
	defer stop()
	for {
		v, ok := next()
		if !ok {
			break
		}
		fmt.Print(v, " ") // 3 2 1
	}
	fmt.Println()
}
