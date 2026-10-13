package main

import (
	"fmt"
	"strings"
)

/*
Strings are IMMUTABLE sequences of BYTES, usually holding UTF-8 text.
 len(s)   number of BYTES (not characters)
 s[i]     the i-th BYTE
 the strings package has the helpers: Contains, Split, Join, Replace, ToUpper, Fields ...
*/

func accessingCharacters() {
	name := "Programiz"
	fmt.Println("length:", len(name))                             // 9
	fmt.Printf("%c %c %c\n", name[0], name[3], name[len(name)-1]) // P g z
	fmt.Println(name[0])                                          // 80 -> a byte (uint8), not a character
	fmt.Println(name[3:7])                                        // gram -> slicing works on bytes too
}

func stringsAreImmutable() {
	message := "Go"
	// message[0] = 'g' // compile error: cannot assign to message[0]
	message = message + " " + "Lang" // builds a NEW string; "Go" itself is unchanged
	fmt.Println(message)             // Go Lang
}

func comparingStrings() {
	fmt.Println("Programiz" == "programiz")                    // false -> case-sensitive
	fmt.Println(strings.EqualFold("Programiz", "programiz"))   // true
	fmt.Println(strings.Compare("Programiz", "Programiz Pro")) // -1
	fmt.Println("apple" < "banana")                            // true
}

func searching() {
	text := "Go Programming"
	fmt.Println(strings.Contains(text, "Go"), strings.Contains(text, "Golang")) // true false
	fmt.Println(strings.HasPrefix(text, "Go"), strings.HasSuffix(text, "ing"))  // true true
	fmt.Println(strings.Index(text, "Pro"), strings.Count(text, "g"))           // 3 2
}

func transforming() {
	fmt.Println(strings.Replace("car", "r", "t", 1))       // cat
	fmt.Println(strings.Replace("Programiz", "r", "R", 2)) // PRogRamiz
	fmt.Println(strings.ReplaceAll("a-b-c", "-", "+"))     // a+b+c
	fmt.Println(strings.ToUpper("go is fun"))              // GO IS FUN
	fmt.Println(strings.ToLower("I LOVE GOLANG"))          // i love golang
	fmt.Println(strings.TrimSpace("  padded  "))           // padded
	fmt.Println(strings.Trim("--x--", "-"))                // x
	fmt.Println(strings.Repeat("ab", 3))                   // ababab
	fmt.Println(strings.Title("legacy title"))             //nolint // deprecated: use golang.org/x/text/cases
}

func splittingAndJoining() {
	fmt.Println(strings.Split("I Love Golang", " "))                // [I Love Golang]
	fmt.Println(strings.Fields("  many   spaces here "))            // [many spaces here]
	fmt.Println(strings.Join([]string{"I", "love", "Golang"}, " ")) // I love Golang

	before, after, found := strings.Cut("key=value", "=") // Go 1.18
	fmt.Println(before, after, found)                     // key value true

	dir, file, _ := strings.CutLast("/home/subbu/notes.txt", "/") // Go 1.27
	fmt.Println(dir, file)                                        // /home/subbu notes.txt

	for part := range strings.SplitSeq("a,b,c", ",") { // an iterator, Go 1.24
		fmt.Print(part, " ")
	}
	fmt.Println()
}
