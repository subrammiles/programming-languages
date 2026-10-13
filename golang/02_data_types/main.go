// Data types.
//
//	go run ./02_data_types
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "basic types", Run: primitiveDataTypes},
		{Name: "overflow and division", Run: integerOverflowAndDivision},
		{Name: "nil", Run: nilValues},
		{Name: "float and int conversion", Run: floatAndIntConversion},
		{Name: "runes and characters", Run: runesAndCharacters},
		{Name: "strings and numbers (strconv)", Run: stringsAndNumbers},
		{Name: "defined types and aliases", Run: definedTypes},
	})
}
