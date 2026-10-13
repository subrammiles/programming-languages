package main

import "fmt"

/*
Methods can be declared on ANY type you define in the same package,
not just structs: numbers, strings, slices, functions ...
You can't add methods to types from other packages (like int or time.Time directly).
*/

type myNumber int

func (n myNumber) isEven() bool { return n%2 == 0 }
func (n *myNumber) increment()  { *n++ } // pointer receiver: changes the original

type myString string

func (s myString) isEmpty() bool { return len(s) == 0 }

type myList []int

func (list myList) sum() int {
	total := 0
	for _, v := range list {
		total += v
	}
	return total
}

func methodsOnAnyType() {
	var num myNumber = 12
	fmt.Println(num.isEven()) // true
	num.increment()
	fmt.Println(num) // 13

	var s myString = ""
	fmt.Println(s.isEmpty()) // true

	list := myList{1, 2, 3}
	fmt.Println(list, list.sum()) // [1 2 3] 6
}
