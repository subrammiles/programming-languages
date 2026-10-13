package main

import "fmt"

/*
Declaring functions
	func name(parameters) returnType { body }
 - parameters of the same type can share it:  func f(a, b int)
 - several return values:                     func f() (int, error)
 - named return values act as variables:      func f() (sum int) { sum = 1; return }
*/

func printHelloWorld() {
	fmt.Println("Hello World")
}

func printMessage(msg string) {
	fmt.Println(msg)
}

func calculateTotalBillAmount(price int, quantity int) int {
	return price * quantity
}

func add4Numbers(num1, num2, num3, num4 int) int {
	return num1 + num2 + num3 + num4
}

func sumAndProduct(num1, num2 int) (int, int) {
	return num1 + num2, num1 * num2
}

func sumAndProductNamed(num1, num2 int) (sum, product int) {
	sum = num1 + num2
	product = num1 * num2
	return // "naked" return: returns sum and product. Fine in short functions only.
}

func functionDeclarations() {
	printHelloWorld()
	printMessage("hi from printMessage")
	fmt.Println(calculateTotalBillAmount(250, 3)) // 750
	fmt.Println(add4Numbers(1, 2, 3, 4))          // 10
	s, p := sumAndProduct(2, 3)
	fmt.Println(s, p)                     // 5 6
	fmt.Println(sumAndProductNamed(4, 5)) // 9 20
}
