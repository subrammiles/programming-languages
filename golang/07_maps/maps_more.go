package main

import (
	"fmt"
	"maps"
	"slices"
	"strings"
)

/*
More map operations
 v, ok := m[key]   "comma ok": tells a missing key apart from a zero value
 delete(m, key)    remove (no error if missing)
 clear(m)          remove everything (Go 1.21)
 maps package      Keys, Values, Clone, Equal, Copy (iterators, Go 1.23)
Iteration order is random on purpose; sort the keys when order matters.
*/

func commaOk() {
	stock := map[string]int{"pen": 0, "book": 4}
	fmt.Println(stock["pen"], stock["ink"]) // 0 0 -> can't tell them apart

	if qty, ok := stock["pen"]; ok {
		fmt.Println("pen is stocked:", qty) // pen is stocked: 0
	}
	if _, ok := stock["ink"]; !ok {
		fmt.Println("ink is not in the map")
	}
}

func deleteAndClear() {
	m := map[string]int{"a": 1, "b": 2, "c": 3}
	delete(m, "a")
	delete(m, "zzz") // fine
	fmt.Println(m)   // map[b:2 c:3]
	clear(m)
	fmt.Println(len(m)) // 0
}

func sortedKeys() {
	scores := map[string]int{"ravi": 75, "asha": 92, "meena": 88}
	for _, name := range slices.Sorted(maps.Keys(scores)) {
		fmt.Println(name, scores[name]) // asha, meena, ravi -> alphabetical every time
	}
}

func countingWords() {
	counts := map[string]int{}
	for _, w := range strings.Fields("the cat and the hat and the bat") {
		counts[w]++ // missing keys start at 0
	}
	fmt.Println(counts["the"], counts["and"], counts["dog"]) // 3 2 0
}

func groupingIntoSlices() {
	byLetter := map[byte][]string{}
	for _, w := range []string{"apple", "avocado", "banana"} {
		byLetter[w[0]] = append(byLetter[w[0]], w) // append works on a nil slice
	}
	fmt.Println(byLetter['a'], byLetter['b']) // [apple avocado] [banana]
}

func mapsAreReferences() {
	original := map[string]int{"x": 1}
	alias := original // NOT a copy
	alias["x"] = 100
	fmt.Println(original["x"]) // 100

	clone := maps.Clone(original)
	clone["x"] = 1
	fmt.Println(original["x"], clone["x"], maps.Equal(original, clone)) // 100 1 false
}

func setsWithMaps() {
	// Go has no set type; use map[T]struct{} (struct{} takes no memory)
	seen := map[string]struct{}{}
	for _, email := range []string{"a@x.com", "b@x.com", "a@x.com"} {
		seen[email] = struct{}{}
	}
	_, hasA := seen["a@x.com"]
	fmt.Println(len(seen), hasA) // 2 true
}
