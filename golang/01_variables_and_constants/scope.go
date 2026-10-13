package main

import "fmt"

/*
Scope: where a name can be used.
 - package level (outside functions): visible in every file of the package
 - function level: visible only inside the function
 - block level: visible only inside { } of an if, for, switch ...
Names starting with a Capital letter are EXPORTED (visible to other packages).
*/

var packageLevel int = 7 // := is not allowed here; use var

func globalAndLocalVariables() {
	fmt.Println(packageLevel) // 7

	local := "only inside this function"
	fmt.Println(local)

	if inner := 10; inner > 5 {
		fmt.Println("inner is", inner) // inner exists only in this if/else
	}
	// fmt.Println(inner) // compile error: undefined: inner
}

func shadowing() {
	x := 1
	if true {
		x := 2                     // a NEW x that hides the outer one (shadowing)
		fmt.Println("inner x:", x) // 2
	}
	fmt.Println("outer x:", x) // 1 -> unchanged; go vet -shadow style linters catch this
}
