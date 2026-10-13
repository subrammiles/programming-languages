package main

import (
	"fmt"
	"strconv"
)

/*
 any (= interface{}) holds a value of ANY type.
 Type assertion:  v, ok := x.(string)   -> ok is false if x isn't a string
                  v := x.(string)       -> panics if it isn't
 Type switch:     switch v := x.(type) { case int: ... }
Prefer specific interfaces or generics (chapter 14) over any where you can.
*/

func emptyInterface() {
	var things []any = []any{42, "hello", 3.5, true, []int{1}}
	for _, t := range things {
		fmt.Printf("%v (%T)\n", t, t)
	}
}

func typeAssertions() {
	var x any = "hello"
	s, ok := x.(string)
	fmt.Println(s, ok) // hello true
	n, ok := x.(int)
	fmt.Println(n, ok) // 0 false -> no panic thanks to ok

	describe := func(v any) string {
		switch v := v.(type) {
		case nil:
			return "nil"
		case int:
			return "int " + strconv.Itoa(v)
		case string:
			return "string " + strconv.Quote(v)
		case fmt.Stringer: // any type with a String() method
			return "stringer " + v.String()
		default:
			return fmt.Sprintf("other %T", v)
		}
	}
	fmt.Println(describe(7), "|", describe("x"), "|", describe(nil), "|", describe(Temperature(21.5)), "|", describe(2.5))
}
