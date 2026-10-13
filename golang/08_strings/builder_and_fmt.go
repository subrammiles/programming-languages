package main

import (
	"fmt"
	"strings"
)

/*
Building strings efficiently: strings.Builder (avoids creating a new string on every +).
fmt verbs:
 %v value   %+v with field names   %#v Go syntax   %T type
 %d int  %5d width  %05d zero-padded  %x hex  %b binary
 %f float  %.2f precision  %e scientific
 %s string  %q quoted  %-10s left-aligned  %c character  %p pointer  %t bool
Sprintf returns a string, Printf prints, Fprintf writes to any io.Writer, Errorf makes an error.
*/

func stringBuilder() {
	var sb strings.Builder
	for i := range 3 {
		fmt.Fprintf(&sb, "line %d\n", i+1)
	}
	sb.WriteString("done")
	fmt.Println(sb.String())
}

func fmtVerbs() {
	type point struct{ X, Y int }
	p := point{1, 2}
	fmt.Printf("%v | %+v | %#v | %T\n", p, p, p, p)
	// {1 2} | {X:1 Y:2} | main.point{X:1, Y:2} | main.point

	fmt.Printf("[%5d] [%-5d] [%05d] [%x] [%b]\n", 42, 42, 42, 255, 5) // [   42] [42   ] [00042] [ff] [101]
	fmt.Printf("[%.2f] [%8.3f] [%e]\n", 3.14159, 3.14159, 1234.5)     // [3.14] [   3.142] [1.234500e+03]
	fmt.Printf("[%s] [%q] [%-8s] [%8s]\n", "go", "go", "go", "go")    // [go] ["go"] [go      ] [      go]
	fmt.Printf("%c %U %t\n", 'G', 'G', true)                          // G U+0047 true

	label := fmt.Sprintf("%s-%03d", "INV", 7)
	fmt.Println(label) // INV-007
}
