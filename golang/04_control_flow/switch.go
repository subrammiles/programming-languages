package main

import (
	"fmt"
	"time"
)

/*
switch
 - cases do NOT fall through (no break needed); use fallthrough to continue explicitly
 - a case can list several values: case 1, 7:
 - switch with no expression is a clean if/else-if chain
 - a type switch checks the dynamic type of an interface value (see 12_interfaces)
*/

func expressionSwitch(day int) {
	switch day {
	case 1, 7:
		fmt.Println(day, "-> weekend")
	case 2, 3, 4, 5, 6:
		fmt.Println(day, "-> weekday")
	default:
		fmt.Println(day, "-> not a day")
	}
}

func switchExamples() {
	expressionSwitch(1)
	expressionSwitch(3)
	expressionSwitch(8)

	hour := 14
	switch { // no expression: the first true case wins
	case hour < 12:
		fmt.Println("good morning")
	case hour < 17:
		fmt.Println("good afternoon") // good afternoon
	default:
		fmt.Println("good evening")
	}

	switch d := time.Saturday; d { // optional short statement
	case time.Saturday, time.Sunday:
		fmt.Println(d, "is a weekend")
	}

	switch 2 {
	case 2:
		fmt.Println("two")
		fallthrough // also run the next case's body
	case 3:
		fmt.Println("three (via fallthrough)")
	}
}

func typeSwitch(value any) {
	switch v := value.(type) {
	case bool:
		fmt.Println("bool", v)
	case string:
		fmt.Println("string of length", len(v))
	case int, float64:
		fmt.Println("number", v)
	default:
		fmt.Printf("something else: %T\n", v)
	}
}

func typeSwitchExamples() {
	typeSwitch("subbu")
	typeSwitch(true)
	typeSwitch(3.5)
	typeSwitch([]int{1})
}
