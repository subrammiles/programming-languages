package main

import "fmt"

/*
Constraints are interfaces that list allowed types.
	type Number interface { ~int | ~int64 | ~float64 }
 |   union: any of these types
 ~   "or any type whose underlying type is this", so type Celsius float64 is allowed
*/

type Number interface {
	~int | ~int32 | ~int64 | ~float32 | ~float64
}

func Sum[T Number](values []T) T {
	var total T
	for _, v := range values {
		total += v
	}
	return total
}

type Celsius float64

func constraintsExample() {
	fmt.Println(Sum([]int{1, 2, 3}))        // 6
	fmt.Println(Sum([]float64{1.5, 2.5}))   // 4
	fmt.Println(Sum([]Celsius{20.5, 21.5})) // 42 -> allowed thanks to ~float64
	// fmt.Println(Sum([]string{"a"}))         // compile error: string does not satisfy Number
}
