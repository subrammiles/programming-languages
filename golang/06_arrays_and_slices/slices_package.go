package main

import (
	"cmp"
	"fmt"
	"slices"
	"sort"
)

/*
The slices package (Go 1.21) - generic helpers for any slice
 Sort SortFunc Contains Index Max Min Reverse BinarySearch
 Insert Delete Compact Equal Clone Concat Repeat Chunk ...
Before Go 1.21 people used the sort package (sort.Ints, sort.Strings).
*/

func sortingAndSearching() {
	nums := []int{5, 4, 3, 2, 1}
	sort.Ints(nums) // the older way
	fmt.Println(nums)

	words := []string{"e", "d", "c", "b", "a"}
	slices.Sort(words)
	fmt.Println(words) // [a b c d e]

	// Binary search only works on SORTED data
	idx, found := slices.BinarySearch(nums, 3)
	fmt.Println(idx, found) // 2 true

	fmt.Println(slices.Contains(words, "c"), slices.Index(words, "d")) // true 3
	fmt.Println(slices.Max(nums), slices.Min(nums))                    // 5 1

	slices.Reverse(nums)
	fmt.Println(nums) // [5 4 3 2 1]
}

func sortingStructs() {
	type person struct {
		name string
		age  int
	}
	people := []person{{"Asha", 30}, {"Ravi", 25}, {"Meena", 30}}
	slices.SortFunc(people, func(a, b person) int {
		return cmp.Or(
			cmp.Compare(b.age, a.age),   // age descending
			cmp.Compare(a.name, b.name), // then name ascending
		)
	})
	fmt.Println(people) // [{Asha 30} {Meena 30} {Ravi 25}]
}

func modifyingWithSlicesPackage() {
	s := []int{1, 2, 2, 3, 3, 3, 4}
	fmt.Println(slices.Compact(slices.Clone(s))) // [1 2 3 4] -> removes consecutive duplicates
	s = slices.Insert(s, 0, 0)
	s = slices.Delete(s, 1, 3)                                  // removes s[1:3]
	fmt.Println(s)                                              // [0 2 3 3 3 4]
	fmt.Println(slices.Equal([]int{1, 2}, []int{1, 2}))         // true
	fmt.Println(slices.Concat([]int{1}, []int{2, 3}, []int{4})) // [1 2 3 4]
	fmt.Println(slices.Repeat([]string{"ab"}, 3))               // [ab ab ab]
	for chunk := range slices.Chunk([]int{1, 2, 3, 4, 5}, 2) {  // Go 1.23
		fmt.Print(chunk, " ") // [1 2] [3 4] [5]
	}
	fmt.Println()
}
