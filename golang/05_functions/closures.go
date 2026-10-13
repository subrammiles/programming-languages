package main

import "fmt"

/*
A closure is a function that uses variables from the function that created it.
Those variables live on as long as the closure does.
*/

func greeter() func() string {
	name := "John"
	return func() string {
		name = "Hi " + name // changes the captured variable
		return name
	}
}

func counter() func() int {
	count := 0
	return func() int {
		count++
		return count
	}
}

func closures() {
	message := greeter()
	fmt.Println(message()) // Hi John
	fmt.Println(message()) // Hi Hi John -> the same name variable each time

	c1, c2 := counter(), counter()
	fmt.Println(c1(), c1(), c1(), c2()) // 1 2 3 1 -> each closure has its own count
}
