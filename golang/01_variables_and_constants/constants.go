package main

import (
	"fmt"
	"math"
)

/*
const declares a value fixed at compile time. Constants cannot be reassigned.
Untyped constants are high-precision numbers that take a type only when used.
iota counts 0, 1, 2 ... inside a const block: Go's way of making enums.
*/

const greeting string = "constant"

func constantsDeclarations() {
	const a = 20
	fmt.Println(a, greeting)

	const (
		name    = "John"
		age     = 50
		country = "Canada"
	)
	fmt.Println(name, age, country)
	// a = 89 // compile error: cannot assign to a

	const n = 500000000
	const d = 3e20 / n    // untyped: computed exactly at compile time
	fmt.Println(int64(d)) // 600000000000
	fmt.Println(math.Sin(n))
}

type Weekday int

const (
	Sunday  Weekday = iota // 0
	Monday                 // 1 (the expression repeats)
	Tuesday                // 2
)

type ByteSize float64

const (
	_           = iota // skip 0
	KB ByteSize = 1 << (10 * iota)
	MB
	GB
)

func iotaEnums() {
	fmt.Println(Sunday, Monday, Tuesday) // 0 1 2
	fmt.Println(KB, MB, GB)              // 1024 1.048576e+06 1.073741824e+09
}
