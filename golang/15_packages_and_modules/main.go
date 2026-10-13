// Packages and modules.
//
//	go run ./15_packages_and_modules
//
// Import paths are the module path (from go.mod) plus the folder path.
package main

import (
	"fmt"
	"math/rand/v2" // standard library packages have short paths
	str "strings"  // an import alias

	"github.com/subrammiles/programming-languages/golang/15_packages_and_modules/geometry"
	"github.com/subrammiles/programming-languages/golang/15_packages_and_modules/internal/secret"
)

func main() {
	c := geometry.Circle{Radius: 2}
	sq := geometry.NewSquare(3)
	fmt.Println("circle area:", c.Area())  // 12.57
	fmt.Println("square area:", sq.Area()) // 9
	fmt.Println("pi:", geometry.Pi)
	// geometry.round2(1.234) // compile error: round2 is not exported

	fmt.Println(secret.Greeting())
	fmt.Println(str.ToUpper("aliased import"))
	fmt.Println("dice:", rand.IntN(6)+1)
}
