package main

import "fmt"

/*
A pointer holds a memory address.
 *T    the type "pointer to T"
 &x    the address of x
 *p    the value p points to (dereference): read it or change it
The zero value of a pointer is nil.
*/

func pointerBasics() {
	var number int = 50
	var ptr *int = &number
	fmt.Println(ptr == &number) // true -> both hold the same address
	fmt.Println(*ptr)           // 50

	*ptr = 21           // change the value THROUGH the pointer
	fmt.Println(number) // 21

	i, j := 42, 2701
	p := &i
	p = &j            // point somewhere else
	*p = *p / 37      // divide j through the pointer
	fmt.Println(i, j) // 42 73
}

func nilPointers() {
	var p *int
	fmt.Println(p == nil) // true
	defer func() { fmt.Println("recovered:", recover()) }()
	fmt.Println(*p) // panics: invalid memory address or nil pointer dereference
}
