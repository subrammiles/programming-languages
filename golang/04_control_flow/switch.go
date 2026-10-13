package main

import "fmt"

func expressionSwitch(a int) {
	/* It provides an easy way to dispatch execution to different parts of code based on the value of the expression.
		switch optstatement; optexpression{
	          case expression1: Statement..
	          case expression2: Statement..
	             ...
	          default: Statement..
	}
	*/
	switch day := a; day {
	case 1:
		fmt.Println("Sunday")
	case 2:
		fmt.Println("Monday")
	default:
		fmt.Println("Good Day")
	}
}

func typeSwitch(myvalue interface{}) {
	/*
			Type switch is used when you want to compare types.
			In this switch, the case contains the type which is going to
			compare with the type present in the switch expression.
		Syntax:
		switch optstatement; typeswitchexpression{
		case typelist 1: Statement..
		case typelist 2: Statement..
		...
		default: Statement..
		}
	*/
	//var myvalue interface{}
	switch myvalue.(type) {
	case bool:
		fmt.Println("bool")
	case string:
		fmt.Println("string")
	default:
		fmt.Print("dynamic")
	}
}
func switchInGo() {
	expressionSwitch(8)
	typeSwitch("subbu")
}
