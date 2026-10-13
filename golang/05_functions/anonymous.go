package main

import "fmt"

/*
Go language provides a special feature known as an anonymous function.
An anonymous function is a function which doesn’t contain any name.
It is useful when you want to create an inline function.
In Go language, an anonymous function can form a closure.
An anonymous function is also known as function literal.
Syntax:
         func(parameter_list)(return_type){
             // code..
           // Use return statement if return_type are given
           // if return_type is not given, then do not
           // use return statement
       return
        }()
*/

func method1() {
	fmt.Println("<<<<<<<<,Simple Annonymous function>>>>>>>>")
	// Anonymous function
	func() {
		fmt.Println("Simple Anonymouse function")
	}()
}

func method2() {
	fmt.Println("<<<<<<<<Passing varibles to  Annonymous function>>>>>>>>")
	// Anonymous function
	func(wish string) {
		fmt.Println("Helo " + wish)
	}("subbu")

}
func method3() {
	fmt.Println("<<<<<<<<Assign anonymous function to a variable >>>>>>>>")
	/*
		you are allowed to assign an anonymous function to a variable.
		When you assign a function to a variable, then the type of the variable is
		 of function type and you can call that variable like a function call as
		 shown in the below example.
	*/

	myvar := func() {
		fmt.Println("Hi I am assinging to a varible")
	}
	myvar()
	myvar2 := func(wish string) {
		fmt.Println("Hi I am assinging to a varible" + " " + wish)
	}
	myvar2("Subbu")

}
func method4() {
	fmt.Println("<<<<<<<< anonymous function  as an argument >>>>>>>>")
	/*You can also pass an anonymous function as an argument
	into other function.*/
	add := func(p, q int) int {
		return p + q
	}
	mul := func(p, q int) int {
		return p * q
	}
	myfuncWithAnonymousAsAnArgument(add)
	myfuncWithAnonymousAsAnArgument(mul)
}
func myfuncWithAnonymousAsAnArgument(myfuncResult func(p, q int) int) {
	/*myfuncResult is a function*/
	/*It will return integer and accept 2 int arguments*/
	/*We need to do some operation and return int*/
	/*So this function is like a blue print.Accepts 2 arguments and prints
	the returend value*/
	result := myfuncResult(2, 3)
	fmt.Println(result)
}
func method5() {
	fmt.Println("<<<<<<<< anonymous function  as a return >>>>>>>>")
	//You can also return an anonymous function from another function.
	add := getOperation("sum")
	mul := getOperation("mul")
	fmt.Println("addition of 2,3 is " + fmt.Sprint(add(2, 3)))
	fmt.Println("mul of 2,3 is " + fmt.Sprint(mul(2, 3)))

}
func getOperation(operation string) func(p, q int) int {
	add := func(p, q int) int {
		return p + q
	}
	mul := func(p, q int) int {
		return p * q
	}
	if operation == "sum" {
		return add
	} else {
		return mul
	}
}
func main() {
	method1()
	method2()
	method3()
	method4()
	method5()
}
