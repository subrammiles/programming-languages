package main

import (
	"fmt"
)

/*Method  contains a receiver  and function  does not contain a receiver.*/

type Rectangle struct {
	length  int
	breadth int
}

/*functions*/
func areaOfARectangle(r Rectangle) int {
	return r.breadth * r.length
}
func permeterofARectangle(r Rectangle) int {
	return 2 * (r.length + r.breadth)
}

/*methods*/
func (r Rectangle) areaOfARectangle() int {
	return r.breadth * r.length
}
func (r Rectangle) permeterofARectangle() int {
	return 2 * (r.length + r.breadth)
}

func functionVsMethods() {
	rect := Rectangle{12, 13}
	/*area and permeter using functions*/
	fmt.Print(areaOfARectangle(rect))
	fmt.Print(permeterofARectangle(rect))
	/*area and permeter using methods*/
	fmt.Print(rect.areaOfARectangle())
	fmt.Print(rect.permeterofARectangle())
	/*
			1.We can caluculate the area and peremeter using both functions
			and methods.But We can group all Rectangle related methods like
			getArea,getPermiter,getColor etc.
			2.Go is not a pure object-oriented programming language and
		    it does not support classes. Hence methods on types are a way to
		     achieve behaviour similar to classes.
		    3.Methods allow a logical grouping of behaviour related to a type
			similar to classes.
	*/

}
