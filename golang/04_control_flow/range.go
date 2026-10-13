package main

import "fmt"

/*
range over a string gives (byte index, rune) pairs.
Indexes jump when a character takes more than one byte in UTF-8.
*/

func rangeOverString() {
	for i, r := range "Hello Go" {
		fmt.Printf("str[%d] = %c (%d)\n", i, r, r)
	}
	for i, r := range "héllo" {
		fmt.Print(i, ":", string(r), " ") // 0:h 1:é 3:l 4:l 5:o -> é uses 2 bytes
	}
	fmt.Println()
}
