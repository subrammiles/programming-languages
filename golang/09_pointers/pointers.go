package main

import "fmt"

/*
In Go, we use the pointer variables to store the memory address.
*/
func goPointerVarible() {
	var myNumber1 int = 50
	var ptrToMyNum1 *int
	myNumber1Address := &myNumber1
	ptrToMyNum1 = &myNumber1
	fmt.Println("Memory Address:", myNumber1Address) //Memory Address: 0x140000aa020
	fmt.Println("Memory Address:", ptrToMyNum1)      //Memory Address: 0x140000aa020
	/*
	 Here, both the pointer variable ptrToMyNum1 and myNumber1Address same value
	 because both represents addresss of the same location
	*/
	/*
		Advantage of using the * operator is  to access the value present
		 in the memory address pointed by the pointer.
	*/
	// * to get the value pointed by ptr
	fmt.Println(*ptrToMyNum1) // 50
}
