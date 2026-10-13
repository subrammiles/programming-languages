package main

import "fmt"

/*
_ is the blank identifier: "I don't need this value".
Go refuses to compile unused variables, so _ is how you ignore a return value.
*/

func sumAndProductOfTwoNumbers() (int, int) {
	return 2 + 2, 2 * 2
}

func blankIdentifier() {
	sum, _ := sumAndProductOfTwoNumbers()
	fmt.Println(sum) // 4

	for _, v := range []string{"a", "b"} {
		fmt.Print(v)
	}
	fmt.Println()
}
