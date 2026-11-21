package main

import (
	"fmt"
	"math"
	"math/big"
)

/*
Overflow, floating point, and math/big
  - int is 64-bit on 64-bit systems; integer overflow WRAPS AROUND silently (no panic)
  - float64 cannot represent 0.1 exactly: never use it for money
  - math/big: Int (any size integer), Rat (exact fractions), Float (chosen precision)
    Methods store the result in the receiver: z.Add(x, y) means z = x + y
For money, many teams store integer cents (int64) or use a decimal library (shopspring/decimal).
*/

func overflowAndFloats() {
	var x int8 = 127
	x++
	fmt.Println(x) // -128   (wrapped around)

	var u uint8 = 255
	u++
	fmt.Println(math.MaxInt64, u) // 9223372036854775807 0
	// (with constants the compiler catches it: uint8(255)+1 does not compile)

	fmt.Println(0.1+0.2 == 0.3) // true    (untyped CONSTANTS are exact at compile time!)
	a, b := 0.1, 0.2
	fmt.Println(a+b == 0.3, a+b)                                                       // false 0.30000000000000004
	fmt.Println(math.Abs(a+b-0.3) < 1e-9)                                              // true    (compare floats with a tolerance)
	fmt.Println(7/2, 7.0/2, -7/2, -7%3)                                                // 3 3.5 -3 -1
	fmt.Println(math.Inf(1), math.NaN() == math.NaN())                                 // +Inf false
	fmt.Println(math.Round(2.5), math.Round(-2.5), math.Floor(-2.5), math.Trunc(-2.7)) // 3 -3 -3 -2
}

func bigNumbers() {
	// big.Int: factorial of 30 is far beyond int64
	f := big.NewInt(1)
	for i := int64(2); i <= 30; i++ {
		f.Mul(f, big.NewInt(i))
	}
	fmt.Println(f) // 265252859812191058636308480000000

	n, _ := new(big.Int).SetString("123456789012345678901234567890", 10)
	fmt.Println(new(big.Int).Mul(n, n))                                // 15241578753238836750495351562536198787501905199875019052100
	fmt.Println(new(big.Int).Exp(big.NewInt(2), big.NewInt(100), nil)) // 1267650600228229401496703205376
	fmt.Println(big.NewInt(97).ProbablyPrime(20), n.Cmp(f))            // true -1

	// big.Rat: exact fractions
	r := new(big.Rat)
	for range 10 {
		r.Add(r, big.NewRat(1, 10)) // add 1/10 ten times
	}
	fmt.Println(r, r.FloatString(2)) // 1/1 1.00

	third := big.NewRat(1, 3)
	fmt.Println(new(big.Rat).Mul(third, big.NewRat(3, 1))) // 1/1

	// big.Float: choose the precision (in bits)
	pi := new(big.Float).SetPrec(200)
	pi.SetString("3.14159265358979323846264338327950288419716939937510")
	fmt.Println(pi.Text('f', 40)) // 3.1415926535897932384626433832795028841972
}
