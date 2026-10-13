package main

import "fmt"

/*
A method is a function with a RECEIVER: the value it's called on.
	func (a Author) Show() { ... }      called as  author.Show()
Methods group behaviour with a type, much like methods on a class.
*/

type author struct {
	name   string
	branch string
	salary int
}

func (a author) show() {
	fmt.Println("Author's name:", a.name)
	fmt.Println("Branch name:", a.branch)
	fmt.Println("Salary:", a.salary)
}

func methodWithStructReceiver() {
	res := author{name: "Sona", branch: "CSE", salary: 34000}
	res.show()
}
