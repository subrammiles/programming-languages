package main

import (
	"fmt"
)

/*Basic data stracture int ,string....*/
/*
In Go language, you are allowed to create a method with non-struct type receiver as long as the type and the method
definitions are present in the same package.
*/
/*Integer*/
type MyNumber int

func (n MyNumber) isEvenNumber() bool {
	return (n % 2) == 0
}
func (n *MyNumber) incrementByOne() {
	/*We are using pointer.So actual argument changes*/
	*n = *n + 1
}

func testIntegerMethods() {
	var num MyNumber = 12
	fmt.Println(num.isEvenNumber())
	num.incrementByOne()
	fmt.Println(num)
}

/*String*/
type MyString string

func (s MyString) isEmpty() bool {
	if len(s) > 0 {
		return false
	} else {
		return true
	}
}

func testMyStringMethods() {
	var mtstr MyString = ""
	fmt.Println(mtstr.isEmpty())
}

/*List*/
type MyList []int

func (list MyList) print() {
	fmt.Printf("list: %v\n", list)
}

func testListMethods() {
	var list MyList = []int{1, 2, 3}
	list.print()
}

func methodsOnDataType() {
	testIntegerMethods()
	testMyStringMethods()
	testListMethods()
}
