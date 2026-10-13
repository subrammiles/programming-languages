package main

import "fmt"

/*
A method has a receiver; a function doesn't. Both can do the same work,
but methods keep a type's behaviour together and let the type satisfy interfaces.
*/

type rectangle struct {
	length, breadth int
}

func area(r rectangle) int      { return r.length * r.breadth }
func perimeter(r rectangle) int { return 2 * (r.length + r.breadth) }

func (r rectangle) area() int      { return r.length * r.breadth }
func (r rectangle) perimeter() int { return 2 * (r.length + r.breadth) }

func functionVsMethod() {
	rect := rectangle{12, 13}
	fmt.Println(area(rect), perimeter(rect))   // 156 50 -> functions
	fmt.Println(rect.area(), rect.perimeter()) // 156 50 -> methods
}
