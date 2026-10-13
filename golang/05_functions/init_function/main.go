// init functions run automatically, before main, when a package is initialised.
//
//		go run ./05_functions/init_function
//
//	  - no arguments, no return values, cannot be called by name
//	  - a package may have several; they run in the order they appear
//	    (files in name order); imported packages initialise first
//	  - use them for setup that can't be a simple variable initialiser
package main

import "fmt"

var config = loadConfig() // package variables are initialised before init()

func loadConfig() string {
	fmt.Println("1. package variables are initialised")
	return "production"
}

func init() {
	fmt.Println("2. first init()")
}

func init() {
	fmt.Println("3. second init()")
}

func main() {
	fmt.Println("4. main(), config =", config)
}
