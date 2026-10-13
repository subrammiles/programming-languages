package main

import "fmt"

/*
Every variable lives at a memory address. & gives you that address.
*/

func memoryAddress() {
	var number int = 50
	address := &number
	fmt.Println("value:", number)
	fmt.Println("address:", address)             // e.g. 0xc000012345 (different every run)
	fmt.Printf("type of address: %T\n", address) // *int
}
