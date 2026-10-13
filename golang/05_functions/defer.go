/*
In Go language, defer statements delay the execution of the
function or method or an anonymous method until the nearby functions returns.*/

/*
// Function
defer func func_name(parameter_list Type)return_type{
// Code
}

// Method
defer func (receiver Type) method_name(parameter_list){
// Code
}

defer func (parameter_list)(return_type){
// code
}()
*/
package main

import "fmt"

func method1() {
	fmt.Println("<<<<<<<<<Method 1>>>>>>>>>")
	// Calling mul() function
	// Here mul function behaves
	// like a normal function
	mul(2, 3)
	dummyFunction("Hello I am dummy")
	/* Mul result is printed first then dummy function results prints*/
}

func method2() {
	fmt.Println("<<<<<<<<<Method 2>>>>>>>>>")
	// Calling mul() function
	// Here mul function behaves
	// like a defer  function
	defer mul(2, 3)
	dummyFunction("Hello I am dummy")
	/* Mul result is not  printed first . dummy function results prints first as it is
	the neirby function to mul*/
	/*After executing all nearby function ,it calls mul*/

}

func method3() {
	fmt.Println("<<<<<<<<<Method 3>>>>>>>>>")
	dummyFunction("Hello I am  upper dummy")
	defer mul(2, 3)
	dummyFunction("Hello I am lower  dummy")
}
func mul(a, b int) {
	fmt.Println(fmt.Sprint(a * b))
}

func dummyFunction(msg string) {
	fmt.Println(msg)
}
func main() {
	method1()
	method2()
	method3()
}
