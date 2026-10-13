// Package examples runs the examples of a chapter.
//
// Every chapter's main.go lists its examples in reading order:
//
//	go run ./05_functions            runs all of them
//	go run ./05_functions closures   runs only those whose name contains "closures"
//	go run ./05_functions list       prints the names
//
// It lives under internal/, so only code inside this module can import it
// (see 15_packages_and_modules).
package examples

import (
	"fmt"
	"os"
	"strings"
)

// Example is one runnable demo.
type Example struct {
	Name string
	Run  func()
}

// Run runs every example, or only the ones named on the command line.
func Run(list []Example) {
	filters := os.Args[1:]
	if len(filters) == 1 && filters[0] == "list" {
		for _, e := range list {
			fmt.Println(e.Name)
		}
		return
	}
	for _, e := range list {
		if !selected(e.Name, filters) {
			continue
		}
		fmt.Printf("\n===== %s =====\n", e.Name)
		e.Run()
	}
}

func selected(name string, filters []string) bool {
	if len(filters) == 0 {
		return true
	}
	for _, f := range filters {
		if strings.Contains(strings.ToLower(name), strings.ToLower(f)) {
			return true
		}
	}
	return false
}
