package main

import "fmt"

/*
Slices: a flexible VIEW over an array.  []int (no length in the type)
A slice header has three parts: a pointer to the array, a length, a capacity.
 create:  []int{1, 2}   make([]int, len, cap)   array[a:b]
 grow:    s = append(s, x)   (always use the result!)
*/

func sliceVsArray() {
	var myarray [2]int = [2]int{1, 2} // size fixed
	myslice := []int{1, 2, 3, 4, 5}   // size flexible
	myslice = append(myslice, 6)
	fmt.Println(myarray, myslice) // [1 2] [1 2 3 4 5 6]
}

func creatingSlices() {
	literal := []int{1, 2, 3}
	made := make([]int, 3)                                                  // [0 0 0]
	withCap := make([]int, 0, 10)                                           // empty, but room for 10
	var nilSlice []int                                                      // nil: len 0, cap 0, still usable
	fmt.Println(literal, made, len(withCap), cap(withCap), nilSlice == nil) // [1 2 3] [0 0 0] 0 10 true
	nilSlice = append(nilSlice, 1)
	fmt.Println(nilSlice) // [1]
}

func slicesFromAnArray() {
	a := [7]int{1, 2, 3, 4, 5, 6, 7}
	fmt.Println(a[:])   // [1 2 3 4 5 6 7]
	fmt.Println(a[0:3]) // [1 2 3] -> from index 0 up to (not including) 3
	fmt.Println(a[:4])  // [1 2 3 4]
	fmt.Println(a[5:])  // [6 7]

	s := a[1:3]
	s[0] = 99         // changes the ARRAY underneath
	fmt.Println(a[1]) // 99
}

func iteratingSlices() {
	countries := []string{"US", "UK", "India"}
	for i := 0; i < len(countries); i++ {
		fmt.Printf("index = %d and value is %s\n", i, countries[i])
	}
	for index, value := range countries {
		fmt.Printf("index = %d and value is %s\n", index, value)
	}
}

func sliceOfStructs() {
	type student struct {
		no   int
		name string
	}
	students := []student{{1, "subbu"}, {2, "jaffa"}}
	students = append(students, student{3, "ravi"})
	fmt.Println(students) // [{1 subbu} {2 jaffa} {3 ravi}]
}
