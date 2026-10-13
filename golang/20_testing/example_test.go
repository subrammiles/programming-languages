package cart_test // an "external" test package: tests only the exported API

import (
	"fmt"

	cart "github.com/subrammiles/programming-languages/golang/20_testing"
)

// Examples are tests AND documentation: go test checks the Output comment,
// and go doc / pkg.go.dev show the example.
func ExampleSlug() {
	fmt.Println(cart.Slug("Learn Go in 2026!"))
	// Output: learn-go-in-2026
}

func ExampleCart_Total() {
	c := cart.New()
	c.Add("pen", 1000, 2)
	fmt.Println(c.Total(25))
	// Output: 1500
}
