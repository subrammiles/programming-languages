package main

import (
	"errors"
	"fmt"
)

/*
Custom error types carry extra data. Implement Error() string.
errors.Join (Go 1.20) combines several errors into one.
*/

type ValidationError struct {
	Field   string
	Problem string
}

func (e *ValidationError) Error() string {
	return e.Field + ": " + e.Problem
}

type User struct {
	Name  string
	Email string
	Age   int
}

func validate(u User) error {
	var errs []error
	if u.Name == "" {
		errs = append(errs, &ValidationError{"name", "is required"})
	}
	if u.Age < 0 {
		errs = append(errs, &ValidationError{"age", "cannot be negative"})
	}
	return errors.Join(errs...) // nil if errs is empty
}

func customErrors() {
	fmt.Println(validate(User{Name: "Asha", Age: 30})) // <nil>

	err := validate(User{Age: -1})
	fmt.Println(err)
	// name: is required
	// age: cannot be negative

	var ve *ValidationError
	if errors.As(err, &ve) { // finds the first ValidationError in the joined errors
		fmt.Println("first invalid field:", ve.Field)
	}
}
