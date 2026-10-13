// Variables and constants.
//
//	go run ./01_variables_and_constants
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "var keyword", Run: varKeyword},
		{Name: "many variables at once", Run: manyVariablesAtOnce},
		{Name: "short declaration :=", Run: shortVariableDeclaration},
		{Name: "type inference", Run: typeInference},
		{Name: "zero values", Run: zeroValues},
		{Name: "constants", Run: constantsDeclarations},
		{Name: "iota enums", Run: iotaEnums},
		{Name: "scope", Run: globalAndLocalVariables},
		{Name: "shadowing", Run: shadowing},
	})
}
