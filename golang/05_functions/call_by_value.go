package main

import "fmt"

/*
Go always passes arguments BY VALUE: the function gets a copy.
To let a function change the caller's variable, pass a POINTER (&x) and use *p inside.
*/

func swapCopies(a, b int) {
	a, b = b, a
	fmt.Printf("inside swapCopies a=%d b=%d\n", a, b)
}

func swapThroughPointers(pa, pb *int) {
	*pa, *pb = *pb, *pa
	fmt.Printf("inside swapThroughPointers a=%d b=%d\n", *pa, *pb)
}

func callByValue() {
	a, b := 1, 2
	swapCopies(a, b)
	fmt.Printf("after swapCopies a=%d b=%d\n", a, b) // a=1 b=2 -> unchanged

	swapThroughPointers(&a, &b)
	fmt.Printf("after swapThroughPointers a=%d b=%d\n", a, b) // a=2 b=1
}

func slicesShareTheirData() {
	nums := []int{1, 2, 3}
	double := func(s []int) {
		for i := range s {
			s[i] *= 2 // the copy of the slice header points at the SAME array
		}
	}
	double(nums)
	fmt.Println(nums) // [2 4 6]
}
