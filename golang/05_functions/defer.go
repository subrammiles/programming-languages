package main

import "fmt"

/*
defer runs a call when the surrounding function RETURNS (normally or by panic).
 - typical use: clean-up right next to the setup:  f, _ := os.Open(x); defer f.Close()
 - several defers run in LAST-IN, FIRST-OUT order
 - arguments are evaluated immediately, the call happens later
*/

func multiply(a, b int) {
	fmt.Println(a * b)
}

func deferBasics() {
	fmt.Println("start")
	defer multiply(2, 3) // printed last
	fmt.Println("end")
}

func deferOrder() {
	for i := range 3 {
		defer fmt.Println("deferred", i) // 2, 1, 0
	}
	fmt.Println("loop done")
}

func deferArgumentsEvaluatedEarly() {
	x := 10
	defer fmt.Println("deferred sees x =", x) // 10, captured now
	x = 20
	fmt.Println("x is now", x)
}

func deferCanChangeNamedResults() (result int) {
	defer func() { result *= 2 }()
	return 21 // result = 21, then the deferred func doubles it
}

func deferExamples() {
	deferBasics()
	deferOrder()
	deferArgumentsEvaluatedEarly()
	fmt.Println(deferCanChangeNamedResults()) // 42
}
