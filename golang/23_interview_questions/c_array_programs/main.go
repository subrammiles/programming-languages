// Slice (array) programs asked in Go interviews.
//
//	go run ./23_interview_questions/c_array_programs
//
// Patterns to recognise: map lookups, two pointers, sliding window, running max/min.
package main

import (
	"fmt"
	"math"
	"slices"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

func TopTwo(nums []int) (int, int) {
	first, second := math.MinInt, math.MinInt
	for _, n := range nums {
		if n > first {
			first, second = n, first
		} else if n > second && n != first {
			second = n
		}
	}
	return first, second
}

func Duplicates(nums []int) []int {
	seen := map[int]int{}
	var dups []int
	for _, n := range nums {
		seen[n]++
		if seen[n] == 2 {
			dups = append(dups, n)
		}
	}
	return dups
}

func MissingNumber(nums []int) int {
	n := len(nums) + 1
	sum := n * (n + 1) / 2
	for _, x := range nums {
		sum -= x
	}
	return sum
}

func TwoSum(nums []int, target int) (int, int, bool) {
	seen := map[int]int{} // value -> index
	for i, n := range nums {
		if j, ok := seen[target-n]; ok {
			return j, i, true
		}
		seen[n] = i
	}
	return 0, 0, false
}

func RemoveDuplicates(nums []int) []int {
	seen := map[int]bool{}
	out := nums[:0] // filter in place, reusing the backing array
	for _, n := range nums {
		if !seen[n] {
			seen[n] = true
			out = append(out, n)
		}
	}
	return out
}

func Rotate(nums []int, k int) []int {
	k %= len(nums)
	return append(slices.Clone(nums[len(nums)-k:]), nums[:len(nums)-k]...)
}

func MoveZeros(nums []int) {
	w := 0
	for _, n := range nums {
		if n != 0 {
			nums[w] = n
			w++
		}
	}
	clear(nums[w:]) // set the rest to 0
}

func MergeSorted(a, b []int) []int {
	out := make([]int, 0, len(a)+len(b))
	i, j := 0, 0
	for i < len(a) && j < len(b) {
		if a[i] <= b[j] {
			out = append(out, a[i])
			i++
		} else {
			out = append(out, b[j])
			j++
		}
	}
	out = append(out, a[i:]...)
	return append(out, b[j:]...)
}

// MaxSubarray is Kadane's algorithm.
func MaxSubarray(nums []int) int {
	best, cur := nums[0], nums[0]
	for _, n := range nums[1:] {
		cur = max(n, cur+n)
		best = max(best, cur)
	}
	return best
}

func MaxProfit(prices []int) int {
	lowest, profit := math.MaxInt, 0
	for _, p := range prices {
		lowest = min(lowest, p)
		profit = max(profit, p-lowest)
	}
	return profit
}

func Chunk[T any](s []T, size int) [][]T {
	var out [][]T
	for chunk := range slices.Chunk(s, size) { // Go 1.23
		out = append(out, chunk)
	}
	return out
}

func Intersection(a, b []int) []int {
	inA := map[int]bool{}
	for _, x := range a {
		inA[x] = true
	}
	var out []int
	for _, x := range b {
		if inA[x] {
			out = append(out, x)
			delete(inA, x) // avoid adding the same value twice
		}
	}
	return out
}

// MaxSumWindow returns the largest sum of k consecutive numbers (sliding window).
func MaxSumWindow(nums []int, k int) int {
	sum := 0
	for _, n := range nums[:k] {
		sum += n
	}
	best := sum
	for i := k; i < len(nums); i++ {
		sum += nums[i] - nums[i-k] // slide: add the new element, drop the old one
		best = max(best, sum)
	}
	return best
}

func run() {
	fmt.Println(TopTwo([]int{12, 35, 1, 10, 34, 35}))   // 35 34
	fmt.Println(Duplicates([]int{4, 2, 7, 2, 4, 4}))    // [2 4]
	fmt.Println(MissingNumber([]int{1, 2, 4, 5, 6}))    // 3
	fmt.Println(TwoSum([]int{2, 7, 11, 15}, 9))         // 0 1 true
	fmt.Println(RemoveDuplicates([]int{3, 1, 3, 2, 1})) // [3 1 2]
	fmt.Println(Rotate([]int{1, 2, 3, 4, 5}, 2))        // [4 5 1 2 3]

	z := []int{0, 1, 0, 3, 12}
	MoveZeros(z)
	fmt.Println(z) // [1 3 12 0 0]

	fmt.Println(MergeSorted([]int{1, 4, 7}, []int{2, 3, 8}))        // [1 2 3 4 7 8]
	fmt.Println(MaxSubarray([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4}))  // 6
	fmt.Println(MaxProfit([]int{7, 1, 5, 3, 6, 4}))                 // 5
	fmt.Println(Chunk([]string{"a", "b", "c", "d", "e"}, 2))        // [[a b] [c d] [e]]
	fmt.Println(Intersection([]int{1, 2, 2, 3}, []int{2, 2, 3, 5})) // [2 3]
	fmt.Println(MaxSumWindow([]int{2, 1, 5, 1, 3, 2}, 3))           // 9

	// Built-ins worth knowing in an interview
	nums := []int{5, 2, 8, 1}
	fmt.Println(slices.Max(nums), slices.Min(nums), slices.Contains(nums, 8), slices.Index(nums, 8)) // 8 1 true 2
	sorted := slices.Sorted(slices.Values(nums))
	fmt.Println(sorted, nums)                            // [1 2 5 8] [5 2 8 1]
	fmt.Println(slices.Compact([]int{1, 1, 2, 2, 2, 3})) // [1 2 3]
}

func main() {
	examples.Run([]examples.Example{{Name: "slice programs", Run: run}})
}
