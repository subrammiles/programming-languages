package main

import (
	"cmp"
	"fmt"
	"slices"
	"sort"
	"strings"
)

/*
Sorting and searching
  slices.Sort / slices.SortFunc / slices.SortStableFunc   (Go 1.21+, generic, preferred)
  cmp.Compare, cmp.Or                                     build comparison functions
  slices.BinarySearch / BinarySearchFunc                  O(log n) search on a sorted slice
  sort.Slice / sort.SliceStable / sort.Search             the older API, still common in code you will read
  sort.Interface (Len, Less, Swap) is shown in 12_interfaces.
*/

type person struct {
	name string
	dept string
	age  int
}

func sortingStructs() {
	people := []person{
		{"Cy", "IT", 25}, {"Ann", "HR", 30}, {"Bo", "IT", 30}, {"Dee", "HR", 25},
	}

	// by age
	slices.SortFunc(people, func(a, b person) int { return cmp.Compare(a.age, b.age) })
	fmt.Println(people) // [{Cy IT 25} {Dee HR 25} {Ann HR 30} {Bo IT 30}]

	// by dept, then age descending, then name: cmp.Or returns the first non-zero comparison
	slices.SortFunc(people, func(a, b person) int {
		return cmp.Or(
			cmp.Compare(a.dept, b.dept),
			cmp.Compare(b.age, a.age), // b before a = descending
			strings.Compare(a.name, b.name),
		)
	})
	fmt.Println(people) // [{Ann HR 30} {Dee HR 25} {Bo IT 30} {Cy IT 25}]

	// stable sort: equal elements keep their current order
	slices.SortStableFunc(people, func(a, b person) int { return cmp.Compare(a.age, b.age) })
	fmt.Println(people) // [{Dee HR 25} {Cy IT 25} {Ann HR 30} {Bo IT 30}]

	// reverse order
	nums := []int{3, 1, 2}
	slices.SortFunc(nums, func(a, b int) int { return cmp.Compare(b, a) })
	fmt.Println(nums) // [3 2 1]

	// case-insensitive strings
	words := []string{"banana", "Apple", "cherry"}
	slices.Sort(words)
	fmt.Println(words) // [Apple banana cherry]   (uppercase sorts first by byte value)
	slices.SortFunc(words, func(a, b string) int { return cmp.Compare(strings.ToLower(b), strings.ToLower(a)) })
	fmt.Println(words) // [cherry banana Apple]
}

func searching() {
	sorted := []int{2, 5, 8, 12, 16, 23}
	i, found := slices.BinarySearch(sorted, 12)
	fmt.Println(i, found) // 3 true
	i, found = slices.BinarySearch(sorted, 10)
	fmt.Println(i, found) // 3 false   (3 = where 10 would be inserted)

	// insert while keeping the slice sorted
	sorted = slices.Insert(sorted, i, 10)
	fmt.Println(sorted) // [2 5 8 10 12 16 23]

	people := []person{{"Ann", "HR", 22}, {"Bo", "IT", 30}, {"Cy", "IT", 41}}
	j, ok := slices.BinarySearchFunc(people, 30, func(p person, age int) int { return cmp.Compare(p.age, age) })
	fmt.Println(j, ok, people[j].name) // 1 true Bo
}

func olderSortPackage() {
	people := []person{{"Cy", "IT", 25}, {"Ann", "HR", 30}}
	sort.Slice(people, func(i, j int) bool { return people[i].name < people[j].name }) // a "less" function
	fmt.Println(people)                                                                // [{Ann HR 30} {Cy IT 25}]

	nums := []int{1, 3, 5, 7, 9}
	// sort.Search: smallest index where the condition becomes true
	idx := sort.Search(len(nums), func(i int) bool { return nums[i] >= 6 })
	fmt.Println(idx, nums[idx]) // 3 7

	fmt.Println(sort.IntsAreSorted(nums), slices.IsSorted(nums)) // true true
}
