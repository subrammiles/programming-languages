package main

import "fmt"

func callByValue() {
	fmt.Println("<<<<<<<<<<Call by Value>>>>>>>>>>>>>>>")
	/*
		Call by value: : In this parameter passing method,
		values of actual parameters are copied to function’s
		formal parameters and the two types of parameters are stored
		in different memory locations. So any changes made inside
		functions are not reflected in actual parameters of the caller.
	*/
	a := 1
	b := 2
	swap(a, b)
	fmt.Printf("After calling Swap function a = %d  and b= %d \n", a, b)
}

func callByReference() {
	fmt.Println("<<<<<<<<<<Call by Reference>>>>>>>>>>>>>>>")
	/*
		Call by reference: Both the actual and formal
		parameters refer to the same locations, so any
		changes made inside the function are actually reflected
		in actual parameters of the caller.
	*/
	/*Actual parameters*/
	a := 1
	b := 2
	swap2(&a, &b)
	fmt.Printf("After calling Swap function a = %d  and b= %d \n", a, b)
}

// function which swap values
func swap(a, b int) {
	var temp int
	temp = a
	a = b
	b = temp
	fmt.Printf("Inside Swap function a = %d  and b= %d \n", a, b)
}

// function which swap values
func swap2(p_a, p_b *int) {
	var temp int
	temp = *p_a
	//Temp stores the pointer address of a
	*p_a = *p_b
	*p_b = temp
	fmt.Printf("Inside Swap function a = %d  and b= %d \n", p_a, p_b)
}

func main() {
	callByValue()
	callByReference()
}
