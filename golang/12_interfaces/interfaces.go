package main

import (
	"fmt"

	"math"
)

//Interfaces are named collections of method signatures.
/*Syntax:
  type interface_name interface{
    Method signatures
  }
*/

// Here’s a basic interface for geometric shapes.
type Geometry interface {
	area() float64
	perim() float64
}

/*Rectangle*/
type Rectangle struct {
	width, height float64
}

func (r Rectangle) area() float64 {
	return r.width * r.height
}
func (r Rectangle) perim() float64 {
	return 2*r.width + 2*r.height
}

/*Circle*/
type Circle struct {
	radius float64
}

func (c Circle) area() float64 {
	return math.Pi * c.radius * c.radius
}
func (c Circle) perim() float64 {
	return 2 * math.Pi * c.radius
}
func measure(g Geometry) {
	fmt.Println(g)
	fmt.Println(g.area())
	fmt.Println(g.perim())
}

func interfaceTestingWithGemotry() {
	r := Rectangle{width: 3, height: 4}
	c := Circle{radius: 5}
	measure(r)
	measure(c)
}
