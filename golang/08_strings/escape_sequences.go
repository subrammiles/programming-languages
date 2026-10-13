package main

import "fmt"

func escapeSequencesInString() {
	// include double quote
	// message := "This article is about "String" in Go ."

	// Since strings are represented by double quotes, the compiler will treat
	//"This article is about " as the string.
	//Hence, the above code will cause an error.

	// To solve this issue, we can use the escape character \ in Go.
	message := "This article is about \"String\" in Go ."

	fmt.Println(message)
}
