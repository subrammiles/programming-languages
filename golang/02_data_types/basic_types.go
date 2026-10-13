package main

import (
	"fmt"
	"math"
	"unsafe"
)

/*
Basic types
 int  int8 int16 int32 int64     signed integers (int is 64-bit on 64-bit machines)
 uint uint8 ... uint64 uintptr   unsigned (>= 0)
 float32 float64                 decimals (float64 is the default)
 complex64 complex128
 bool
 string                          immutable UTF-8 text
 byte (= uint8)  rune (= int32, a Unicode code point)
Composite types (arrays, slices, maps, structs, pointers) have their own chapters.
*/

func primitiveDataTypes() {
	var myint1 int = -12     // signed
	var myint2 uint = 2      // unsigned: only >= 0
	var myint3 int64 = 34566 // 8 bytes
	var myint4 int32 = 23    // 4 bytes
	var myint5 int16 = 2     // 2 bytes
	fmt.Println(myint1, myint2, myint3, myint4, myint5)
	fmt.Println(math.MaxInt64, math.MinInt8, math.MaxUint8)   // 9223372036854775807 -128 255
	fmt.Println(unsafe.Sizeof(myint1), unsafe.Sizeof(myint4)) // 8 4 (bytes)

	var f64 float64 = 5676.33
	var f32 float32 = 2.3
	fmt.Println(f64, f32)

	message := "Hello World" // double quotes: escapes like \n work
	raw := `C:\no\escapes
can span lines` // backticks: raw string
	fmt.Println(message, raw)

	var yes bool = true
	fmt.Println(yes, !yes)

	var c64 complex64 = 6 + 7i
	c128 := complex(3, 4)
	fmt.Println(c64, real(c128), imag(c128)) // (6+7i) 3 4

	var r1 rune = 'A'
	r2 := '😀'
	fmt.Println(r1, r2, string(r2)) // 65 128512 😀
}

func integerOverflowAndDivision() {
	var small int8 = 127
	small++
	fmt.Println(small) // -128 -> wraps around silently

	fmt.Println(7/2, 7.0/2, 7%2, -7/2) // 3 3.5 1 -3 -> integer division truncates toward zero
	fmt.Println(0.1+0.2 == 0.3)        // false -> floats are approximate
}

func nilValues() {
	// nil is the zero value for pointers, interfaces, maps, slices, channels and functions.
	var s []int
	fmt.Println(s == nil, len(s)) // true 0 -> a nil slice is still safe to read and append to
	// var n int = nil // compile error: ints can't be nil
}
