package main

import "fmt"

/*
Operators
 arithmetic  + - * / %          ++ and -- are STATEMENTS (x++), not expressions
 assignment  = += -= *= /= %= &= |= <<= ...
 comparison  == != < <= > >=
 logical     && || !            (short-circuit)
 bitwise     & | ^ &^ << >>     (&^ is "AND NOT": clear bits)
 address     & (address of)  * (dereference), see chapter 09
There is no ternary ?: operator in Go; use if/else.
*/

func arithmetic() {
	a, b := 17, 5
	fmt.Println(a+b, a-b, a*b, a/b, a%b) // 22 12 85 3 2
	fmt.Println(17.0 / 5)                // 3.4

	x := 10
	x += 5
	x *= 2
	x++            // y := x++ would not compile
	fmt.Println(x) // 31

	fmt.Println("go" + "lang") // golang
}

func comparisonAndLogical() {
	age := 25
	fmt.Println(age >= 18 && age < 60) // true
	fmt.Println(age < 18 || age > 60)  // false
	fmt.Println(!(age == 25))          // false
	fmt.Println("apple" < "banana")    // true -> byte-wise comparison

	var names []string
	if len(names) > 0 && names[0] == "x" { // names[0] is never evaluated
		fmt.Println("never")
	}

	// No ternary operator:
	status := "minor"
	if age >= 18 {
		status = "adult"
	}
	fmt.Println(status)
}

func bitwise() {
	a, b := 0b1100, 0b1010                                   // 12, 10
	fmt.Printf("%04b %04b %04b %04b\n", a&b, a|b, a^b, a&^b) // 1000 1110 0110 0100
	fmt.Println(1<<4, 64>>2)                                 // 16 16

	const (
		Read = 1 << iota
		Write
		Execute
	)
	perms := Read | Write
	fmt.Println(perms&Write != 0, perms&Execute != 0) // true false
}
