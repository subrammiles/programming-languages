package main

import "fmt"

/*
Escape sequences in double-quoted strings:
 \n new line  \t tab  \" quote  \\ backslash  \u00e9 Unicode code point
Raw strings in backticks `...` have NO escapes and can span lines (good for regex, JSON, paths).
*/

func escapeSequences() {
	fmt.Println("This article is about \"String\" in Go.")
	fmt.Println("Tab\tseparated\nnew line")
	fmt.Println("caf\u00e9")
	fmt.Println(`C:\Users\subbu\no\escapes`)
	fmt.Println(`{"name": "Subbu"}`)
}
