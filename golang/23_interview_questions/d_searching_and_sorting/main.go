// Searching and sorting algorithms, written by hand (generic where it helps).
//
//	go run ./23_interview_questions/d_searching_and_sorting
//
// In real code use slices.Sort (pattern-defeating quicksort) and slices.BinarySearch.
//
//	Algorithm        Best        Average     Worst       Extra memory   Stable
//	Bubble sort      O(n)        O(n^2)      O(n^2)      O(1)           yes
//	Selection sort   O(n^2)      O(n^2)      O(n^2)      O(1)           no
//	Insertion sort   O(n)        O(n^2)      O(n^2)      O(1)           yes
//	Merge sort       O(n log n)  O(n log n)  O(n log n)  O(n)           yes
//	Quick sort       O(n log n)  O(n log n)  O(n^2)      O(log n)       no
package main

import (
	"cmp"
	"fmt"
	"slices"
	"sync"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

func BinarySearch[T cmp.Ordered](s []T, target T) int {
	lo, hi := 0, len(s)-1
	for lo <= hi {
		mid := lo + (hi-lo)/2
		switch {
		case s[mid] == target:
			return mid
		case s[mid] < target:
			lo = mid + 1
		default:
			hi = mid - 1
		}
	}
	return -1
}

func BubbleSort[T cmp.Ordered](s []T) {
	for end := len(s) - 1; end > 0; end-- {
		swapped := false
		for i := range end {
			if s[i] > s[i+1] {
				s[i], s[i+1] = s[i+1], s[i]
				swapped = true
			}
		}
		if !swapped {
			return
		}
	}
}

func SelectionSort[T cmp.Ordered](s []T) {
	for i := range len(s) - 1 {
		m := i
		for j := i + 1; j < len(s); j++ {
			if s[j] < s[m] {
				m = j
			}
		}
		s[i], s[m] = s[m], s[i]
	}
}

func InsertionSort[T cmp.Ordered](s []T) {
	for i := 1; i < len(s); i++ {
		key, j := s[i], i-1
		for j >= 0 && s[j] > key {
			s[j+1] = s[j]
			j--
		}
		s[j+1] = key
	}
}

func MergeSort[T cmp.Ordered](s []T) []T {
	if len(s) <= 1 {
		return s
	}
	mid := len(s) / 2
	left, right := MergeSort(s[:mid]), MergeSort(s[mid:])
	out := make([]T, 0, len(s))
	i, j := 0, 0
	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			out = append(out, left[i])
			i++
		} else {
			out = append(out, right[j])
			j++
		}
	}
	out = append(out, left[i:]...)
	return append(out, right[j:]...)
}

func QuickSort[T cmp.Ordered](s []T) {
	if len(s) < 2 {
		return
	}
	pivot, i := s[len(s)-1], 0 // Lomuto partition
	for j := range len(s) - 1 {
		if s[j] < pivot {
			s[i], s[j] = s[j], s[i]
			i++
		}
	}
	s[i], s[len(s)-1] = s[len(s)-1], s[i]
	QuickSort(s[:i])
	QuickSort(s[i+1:])
}

// ParallelMergeSort sorts the two halves in goroutines (only worth it for big inputs).
func ParallelMergeSort(s []int) []int {
	if len(s) < 1000 {
		return MergeSort(s)
	}
	mid := len(s) / 2
	var left, right []int
	var wg sync.WaitGroup
	wg.Go(func() { left = ParallelMergeSort(s[:mid]) })
	right = ParallelMergeSort(s[mid:])
	wg.Wait()
	return MergeSort(append(left, right...)) // simple (not optimal) merge of two sorted halves
}

func run() {
	sorted := []int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}
	fmt.Println(BinarySearch(sorted, 23), BinarySearch(sorted, 7))         // 5 -1
	fmt.Println(BinarySearch([]string{"ant", "bee", "cat", "dog"}, "cat")) // 2

	input := []int{64, 34, 25, 12, 22, 11, 90}
	sorts := []struct {
		name string
		fn   func([]int)
	}{
		{"bubble", BubbleSort[int]},
		{"selection", SelectionSort[int]},
		{"insertion", InsertionSort[int]},
		{"quick", QuickSort[int]},
	}
	for _, s := range sorts {
		data := slices.Clone(input)
		s.fn(data)
		fmt.Printf("%-9s %v\n", s.name, data)
	}
	fmt.Printf("%-9s %v\n", "merge", MergeSort(slices.Clone(input)))
	// each line: [11 12 22 25 34 64 90]

	big := make([]int, 10_000)
	for i := range big {
		big[i] = (i * 7919) % 10_000
	}
	fmt.Println(slices.IsSorted(ParallelMergeSort(big))) // true
}

func main() {
	examples.Run([]examples.Example{{Name: "searching and sorting", Run: run}})
}
