package main

import "fmt"

/*
How append, len and cap work
 - when len < cap, append writes into the existing array
 - when full, append allocates a bigger array (roughly doubling) and copies
 - two slices can share one array, so changes through one can show in the other
 - copy(dst, src) copies elements; s[low:high:max] limits the capacity
*/

func lenAndCap() {
	var s []int
	for i := range 10 {
		s = append(s, i)
		fmt.Printf("len=%-2d cap=%-2d %v\n", len(s), cap(s), s)
	}
}

func sharedArrays() {
	original := []int{1, 2, 3, 4, 5}
	part := original[1:3]   // [2 3], but cap reaches to the end of original
	part = append(part, 99) // overwrites original[3]!
	fmt.Println(original)   // [1 2 3 99 5]

	safe := original[1:3:3]     // full slice expression: cap limited to 2
	safe = append(safe, 100)    // must allocate -> original untouched
	fmt.Println(original, safe) // [1 2 3 99 5] [2 3 100]
}

func copyingSlices() {
	src := []int{1, 2, 3}
	dst := make([]int, len(src))
	n := copy(dst, src)
	dst[0] = 100
	fmt.Println(n, src, dst) // 3 [1 2 3] [100 2 3]

	clone := append([]int(nil), src...) // another common way to copy
	fmt.Println(clone)
}

func removingAndInserting() {
	s := []string{"a", "b", "c", "d"}
	i := 1
	s = append(s[:i], s[i+1:]...) // remove index 1
	fmt.Println(s)                // [a c d]
	// The slices package (next file) makes this clearer: slices.Delete, slices.Insert
}
