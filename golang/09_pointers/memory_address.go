package main

import "fmt"

/*
1.When we create a variable, a memory address is allocated for the
variable to store the value.
2.In Go, we can access the memory address using the & operator.
*/
func memoryAddressOfVaribles() {
	var myNumber1 int = 50
	myNumber1Address := &myNumber1
	fmt.Println("Memory Address:", myNumber1Address) //0x1400000e0c8
}
