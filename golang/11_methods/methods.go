package main

import "fmt"

/*
1.Go supports methods defined on struct types(or non struct types).
2.The method contains a receiver argument in it.With the help of the
receiver argument,the method can access the properties of the receiver.

	func(reciver_name Type) method_name(parameter_list)(return_type){
	   // Code
	}
	Here, the receiver can be accessed within the method.
*/

/*
Method with struct type receiver
*/

// Author structure
type bookauthor struct {
	name   string
	branch string
	salary int
}

// Method with a receiver
// of bookauthor type
func (a bookauthor) show() {

	fmt.Println("Author's Name: ", a.name)
	fmt.Println("Branch Name: ", a.branch)
	fmt.Println("Salary: ", a.salary)
}

// Main function
func methodWithStructTypeReceiver() {
	// Initializing the values
	// of the author structure
	res := bookauthor{
		name:   "Sona",
		branch: "CSE",
		salary: 34000,
	}
	// Calling the method
	res.show()
}
