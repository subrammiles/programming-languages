package main

import "fmt"

/*
An interface value is a pair: (type, value).
It is nil only when BOTH are nil. An interface holding a nil POINTER is NOT nil.
This most often bites with errors: never return a typed nil pointer as an error.
*/

type myError struct{}

func (*myError) Error() string { return "my error" }

func mayFailWrong(fail bool) error {
	var e *myError // nil pointer
	if fail {
		e = &myError{}
	}
	return e // returns (type=*myError, value=nil) -> NOT a nil interface!
}

func mayFailRight(fail bool) error {
	if fail {
		return &myError{}
	}
	return nil
}

func nilInterfaceGotcha() {
	fmt.Println(mayFailWrong(false) == nil) // false  <- surprise
	fmt.Println(mayFailRight(false) == nil) // true
}
