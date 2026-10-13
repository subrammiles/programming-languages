package main

import "fmt"

/*
A language that supports first class functions allows
(i).functions to be assigned to variables,
(ii).passed as arguments to other functions and
(iii).returned from other functions.
*/

/*functions to be assigned to variables*/

func functionAssignedToAvariable() {
	myfunction := func() {
		fmt.Println("This is a function ")
	}
	myfunction()
}

/*passed as arguments to other functions */

func printTheArithmaticResult(myFunc func(a int, b int) int) {
	/*This function accepts a paramter of function
	  That paramter function should have 2 arguments and 1 return value
	*/
	result := myFunc(2, 3)
	fmt.Println(result)
}

func functionAsTheArguments() {
	/*Pass function*/
	sumOf2Numbers := func(a int, b int) int {
		return a + b
	}
	productOf2Numbers := func(a int, b int) int {
		return a * b
	}
	printTheArithmaticResult(sumOf2Numbers)
	printTheArithmaticResult(productOf2Numbers)
}

/*returned from other functions.*/

func getTheArithmaticOperator(operatorType string) (myFunc func(a int, b int) int) {
	/*This function returns  a value  of function type
	  That paramter function should have 2 arguments and 1 return value
	*/
	if operatorType == "sum" {
		return func(a int, b int) int {
			return a + b
		}
	} else {
		return func(a int, b int) int {
			return a * b
		}
	}

}

func functionAsAReturnValue() {
	addOperator := getTheArithmaticOperator("sum")
	additionOfTwoNumbers := addOperator(2, 4)
	fmt.Println(additionOfTwoNumbers)
	productOperator := getTheArithmaticOperator("product")
	productOfTwoNumbers := productOperator(2, 4)
	fmt.Println(productOfTwoNumbers)
}

func firstClassFunctionTesting() {
	functionAssignedToAvariable()
	functionAsTheArguments()
	functionAsAReturnValue()
}
