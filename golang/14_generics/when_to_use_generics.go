package main

import (
	"fmt"
	"maps"
	"slices"
)

/*
When to use generics
 YES: containers (stacks, caches, sets), and functions on slices/maps/channels of any type
 NO:  when an interface already says what you need (io.Reader, fmt.Stringer)
      or when the code only works with one or two types
Most of the time you USE generic code from the standard library: slices, maps, cmp, sync.Map ...

Generic type aliases (Go 1.24):  type Set[T comparable] = map[T]struct{}
*/

type Set[T comparable] = map[T]struct{}

func standardLibraryGenerics() {
	nums := []int{3, 1, 2}
	fmt.Println(slices.Max(nums), slices.Sorted(slices.Values(nums))) // 3 [1 2 3]

	ages := map[string]int{"b": 2, "a": 1}
	fmt.Println(slices.Sorted(maps.Keys(ages))) // [a b]

	seen := Set[string]{"go": {}, "rust": {}}
	_, ok := seen["go"]
	fmt.Println(len(seen), ok) // 2 true
}
