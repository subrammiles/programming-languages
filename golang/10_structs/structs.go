package main

import "fmt"

/*
A struct groups fields of different types into one value.
	type Person struct {
		Name string
		Age  int
	}
 - capitalised fields are exported (visible outside the package, and to encoding/json)
 - structs are VALUES: assigning or passing one copies it
 - structs are comparable with == if all their fields are
*/

type Person struct {
	Name string
	Age  int
}

func creatingStructs() {
	p1 := Person{"John", 25}            // positional: fragile if fields change
	p2 := Person{Name: "Sara", Age: 29} // named fields: preferred
	var p3 Person                       // zero value: {"" 0}
	p4 := &Person{Name: "Ravi"}         // pointer to a new struct

	fmt.Println(p1, p2, p3, *p4) // {John 25} {Sara 29} { 0} {Ravi 0}
	fmt.Println("age:", p2.Age)
	p4.Age = 40              // fields through a pointer, no * needed
	fmt.Printf("%+v\n", *p4) // {Name:Ravi Age:40}
}

func structsAreValues() {
	a := Person{Name: "Asha", Age: 30}
	b := a // copy
	b.Name = "Bina"
	fmt.Println(a.Name, b.Name)          // Asha Bina
	fmt.Println(a == Person{"Asha", 30}) // true
}

func functionAsAField() {
	type rectangle struct {
		length, breadth int
		color           string
		area            func(int, int) int // a function stored in a field
	}
	r := rectangle{
		length:  10,
		breadth: 20,
		color:   "Red",
		area:    func(l, b int) int { return l * b },
	}
	fmt.Println("color:", r.color, "area:", r.area(r.length, r.breadth)) // color: Red area: 200
}

func anonymousStructs() {
	point := struct{ X, Y int }{3, 4} // a one-off struct with no type name
	fmt.Println(point.X + point.Y)    // 7

	tests := []struct {
		input string
		want  int
	}{
		{"a", 1},
		{"abc", 3},
	} // very common in table-driven tests (chapter 20)
	for _, tt := range tests {
		fmt.Println(tt.input, len(tt.input) == tt.want)
	}
}
