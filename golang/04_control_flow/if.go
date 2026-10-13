package main

import (
	"fmt"
	"strconv"
)

/*
if / else if / else
 - no parentheses around the condition, braces are required
 - an optional short statement before the condition: if v := f(); v > 0 { ... }
   v is only visible inside the if/else blocks
*/

func ifElse() {
	if 2 > 3 && 1 > 0 {
		fmt.Println("both true")
	} else {
		fmt.Println("at least one is false")
	}

	marks := 72
	if marks >= 90 {
		fmt.Println("A")
	} else if marks >= 35 {
		fmt.Println("pass") // pass
	} else {
		fmt.Println("fail")
	}
}

func ifWithShortStatement() {
	if n, err := strconv.Atoi("42"); err != nil {
		fmt.Println("not a number:", err)
	} else {
		fmt.Println("parsed", n) // parsed 42
	}
	// This "if err != nil" pattern is everywhere in Go (see 13_errors).
}
