package main

import "fmt"

/*
Declaring variables
 var name type            -> declared, set to the zero value
 var name type = value
 var name = value         -> type inferred from the value
 name := value            -> short declaration, only inside functions
Go is statically typed: a variable's type never changes.
*/

func varKeyword() {
	var myvar int
	myvar = 43
	fmt.Println(myvar) // 43

	var withValue int = 143
	var name string = "subbu"
	var ok bool = true
	var price float32 = 32.44
	var b byte = 2                                // byte is an alias for uint8
	var r rune = 'a'                              // rune is an alias for int32: a Unicode code point
	fmt.Println(withValue, name, ok, price, b, r) // 143 subbu true 32.44 2 97
}

func manyVariablesAtOnce() {
	var i, j, k int
	var c, ch byte
	var f, salary float32
	fmt.Println(i+j+k, c+ch, f+salary) // 0 0 0

	var (
		city    = "Hyderabad"
		pincode = 500001
	)
	fmt.Println(city, pincode)

	x, y := 1, "two" // several values at once, different types
	fmt.Println(x, y)
}

func shortVariableDeclaration() {
	// := declares AND assigns. Only allowed inside functions.
	d := "declared with :="
	fmt.Println(d)

	// := needs at least one NEW variable on the left
	a, err := 1, error(nil)
	b, err := 2, error(nil) // ok: b is new, err is reused
	fmt.Println(a, b, err)
}

func typeInference() {
	var count = 20                                  // int
	var country = "U.S.A"                           // string
	ratio := 0.5                                    // float64
	fmt.Printf("%T %T %T\n", count, country, ratio) // int string float64
}
