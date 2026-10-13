package main

import "fmt"

/*
Function declaration means a way to construct a function.

	func function_name(Parameter-list)(Return_type){
	    // function body.....
	}

func: It is a keyword in Go language, which is used to create a function.
function_name: It is the name of the function.
Parameter-list: It contains the name and the type of the function

	parameters.

Return_type: It is optional and it contain the types of the values that function returns.
If you are using return_type in your function, then it is necessary to
use a return statement in your function.
*/

/*Function with no Parameter and return values */
func printHelloWord() {
	fmt.Println("Hello World")
}

/*Function with one  Parameter */
func printMessage(msg string) {
	fmt.Println(msg)
}

/*Function with 2 input  Parameter and single return value */
func calculateTotalBillAmount(price int, no int) int {
	var totalPrice = price * no
	return totalPrice
}

/*Function with 4 input  Parameter and single return value */
func add4Numbers(num1, num2, num3, num4 int) (sum int) {
	var total = num1 + num2 + num3 + num4
	return total
}

/*Function with 2 input  Parameter and 2 return values */
func getProductAndSumOfNumbers(num1, num2 int) (int, int) {
	return (num1 + num2), (num1 * num2)
}

func getProductAndSumOf3Numbers(num1, num2 int) (sum, product int) {
	sum = (num1 + num2)
	product = (num1 * num2)
	return
}

func functionDeclarationTesting() {

	/*You can use "_ ",if you don n't want to use varible */
	sum2, _ := getProductAndSumOfNumbers(2, 3)
	fmt.Println(sum2)
}
