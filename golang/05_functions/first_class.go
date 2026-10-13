package main

import (
	"fmt"
	"slices"
	"strings"
)

/*
Functions are first-class values:
 1. assigned to variables
 2. passed as arguments
 3. returned from other functions
The standard library uses this everywhere: slices.SortFunc, strings.Map, http.HandleFunc ...
*/

func firstClassFunctions() {
	shout := strings.ToUpper // a function stored in a variable
	fmt.Println(shout("go")) // GO

	words := []string{"banana", "kiwi", "apple"}
	slices.SortFunc(words, func(a, b string) int { return len(a) - len(b) }) // passed as an argument
	fmt.Println(words)                                                       // [kiwi apple banana]

	noVowels := strings.Map(func(r rune) rune {
		if strings.ContainsRune("aeiou", r) {
			return -1 // drop the character
		}
		return r
	}, "programming")
	fmt.Println(noVowels) // prgrmmng
}
