// Every Go program starts in package main, in the function main.
//
// Run it:     go run ./00_getting_started
// Build it:   go build -o hello ./00_getting_started && ./hello
package main

import "fmt" // fmt = "format": printing and formatting text

func main() {
	fmt.Println("Hello, World!")   // Println adds a new line
	fmt.Print("Hello ", "Subbu\n") // Print does not
	fmt.Printf("%s is %d years old\n", "Go", 2026-2009)

	// Go has no semicolons at line ends and uses braces { } for blocks.
	// Unused variables and unused imports are compile errors.
	// Code is formatted by the tool, not by hand: run  go fmt ./...
}
