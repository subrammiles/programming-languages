package main

import "fmt"

/*
Arrays have a FIXED length that is part of the type: [3]int and [4]int are different types.
 - assigning or passing an array COPIES all of it
 - arrays are comparable with ==
In practice you'll mostly use slices (next files); arrays sit underneath them.
*/

func zeroValueArrays() {
	var a [3]int
	var b [3]float32
	var c [4]string
	var d [2]bool
	var e [2]*int
	var f [2]map[string]int
	fmt.Println(a, b, c, d, e, f) // [0 0 0] [0 0 0] [   ] [false false] [<nil> <nil>] [map[] map[]]
}

func settingArrayValues() {
	var a [3]int
	a[0] = 1
	a[1] = 2
	fmt.Println(a, len(a)) // [1 2 0] 3

	var r [2]rune
	r[0], r[1] = 'a', 'r'
	fmt.Println(r) // [97 114]

	n := 2
	var ptrs [2]*int
	ptrs[0] = &n
	fmt.Println(*ptrs[0], ptrs[1] == nil) // 2 true
	// a[5] = 1 // compile error: index out of range
}

func arrayLiterals() {
	a := [2]int{1, 2}
	c := [2]string{"hi", "bro"}
	d := [...]int{12, 78, 50}       // [...] counts the elements for you
	e := [5]int{1: 10, 3: 30}       // set specific indexes
	fmt.Println(a, c, d, len(d), e) // [1 2] [hi bro] [12 78 50] 3 [0 10 0 30 0]
}

func iteratingArrays() {
	d := [...]int{12, 78, 50}
	for i := 0; i < len(d); i++ {
		fmt.Printf("index = %d and value is %d\n", i, d[i])
	}
	e := [...]string{"US", "UK", "India"}
	for index, value := range e {
		fmt.Printf("index = %d and value is %s\n", index, value)
	}
}

func arraysAreValues() {
	array1 := [...]int{1, 2, 3, 4}
	array2 := array1 // a full COPY
	array2[0] = 143
	fmt.Println(array1, array2)               // [1 2 3 4] [143 2 3 4]
	fmt.Println(array1 == [4]int{1, 2, 3, 4}) // true -> arrays can be compared

	type student struct {
		no   int
		name string
	}
	students := [2]student{{1, "subbu"}, {2, "jaffa"}}
	fmt.Println(students) // [{1 subbu} {2 jaffa}]
}
