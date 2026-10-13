package main

import (
	"errors"
	"fmt"
	"strconv"
)

/*
Errors are ordinary VALUES, returned as the last result:
	func Parse(s string) (int, error)
The caller checks:  if err != nil { ... }
error is a built-in interface: anything with an Error() string method.
Go has no exceptions; panic is only for truly unexpected bugs (see panic_and_recover.go).
*/

func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}

func creatingErrors() {
	if result, err := divide(10, 2); err == nil {
		fmt.Println("result:", result) // result: 5
	}
	if _, err := divide(1, 0); err != nil {
		fmt.Println("error:", err) // error: division by zero
	}

	err := fmt.Errorf("user %d not found", 42) // formatted message
	fmt.Println(err)
}

func handlingErrors() {
	inputs := []string{"10", "abc", "30"}
	total := 0
	for _, in := range inputs {
		n, err := strconv.Atoi(in)
		if err != nil {
			fmt.Println("skipping:", err)
			continue
		}
		total += n
	}
	fmt.Println("total:", total) // 40
}
