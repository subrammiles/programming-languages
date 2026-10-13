package main

import (
	"fmt"
	"unicode"
	"unicode/utf8"
)

/*
byte = uint8 (one byte), rune = int32 (one Unicode code point).
UTF-8 uses 1 to 4 bytes per character, so:
 len(s)                    counts bytes
 utf8.RuneCountInString(s) counts characters
 for i, r := range s       walks characters (runes)
 []rune(s)                 converts to characters you can index
*/

func loopThroughString() {
	for _, character := range "Subbu" {
		fmt.Printf("%c ", character)
	}
	fmt.Println()
}

func bytesVsRunes() {
	s := "héllo, 世界"
	fmt.Println(len(s), utf8.RuneCountInString(s)) // 14 9

	for i := 0; i < 3; i++ {
		fmt.Printf("%d:%x ", i, s[i]) // bytes: 0:68 1:c3 2:a9 -> é is two bytes
	}
	fmt.Println()

	runes := []rune(s)
	fmt.Println(string(runes[1]), string(runes[7:])) // é 世界

	b := []byte("hi")
	b[0] = 'H'             // a []byte is mutable
	fmt.Println(string(b)) // Hi
}

func unicodeChecks() {
	for _, r := range "Go 1.27!" {
		switch {
		case unicode.IsLetter(r):
			fmt.Print("L")
		case unicode.IsDigit(r):
			fmt.Print("D")
		case unicode.IsSpace(r):
			fmt.Print("_")
		default:
			fmt.Print("?")
		}
	}
	fmt.Println() // LL_D?DD?
}
