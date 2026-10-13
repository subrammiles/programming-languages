/*

type StructureName struct {
  // structure definition
}
Here,

struct - keyword used to define a structure
StructName - the name of the structure
*/

package main

import "fmt"

func structExample1() {
	// declare a struct
	type Person struct {
		name string
		age  int
	}
	// assign value to struct while creating an instance
	person1 := Person{"John", 25}
	fmt.Println(person1)

	// define an instance
	var person2 Person

	// assign value to struct variables
	person2 = Person{
		name: "Sara",
		age:  29,
	}

	fmt.Println(person2)
	fmt.Println(person2)

	// access the age of the struct
	fmt.Println("Length:", person2.age)
}

func functionInsideAStruct() {
	//Go also allows us to create a function inside a struct.
	//It treats function as a field of struct. For example,

	// initialize the function Rectangle
	type Rectangle func(int, int) int

	// create structure
	type rectanglePara struct {
		length  int
		breadth int
		color   string

		// function as a field of struct
		rect Rectangle
	}
	// assign values to struct variables
	result := rectanglePara{
		length:  10,
		breadth: 20,
		color:   "Red",
		rect: func(length int, breadth int) int {
			return length * breadth
		},
	}

	fmt.Println("Color of Rectangle: ", result.color)
	fmt.Println("Area of Rectangle: ", result.rect(result.length, result.breadth))

	/*
		In the above example, we have defined a function Rectangle as a field of struct rectanglePara and used the function to find the area of a rectangle.
	*/
}
func main() {
	structExample1()
}
