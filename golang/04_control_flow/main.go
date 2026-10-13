// Control flow: if, for, switch.
//
//	go run ./04_control_flow
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "if / else", Run: ifElse},
		{Name: "if with a short statement", Run: ifWithShortStatement},
		{Name: "classic for", Run: classicFor},
		{Name: "for as while", Run: forAsWhile},
		{Name: "infinite loop", Run: infiniteLoop},
		{Name: "range over a slice", Run: rangeOverSlice},
		{Name: "range over a map", Run: rangeOverMap},
		{Name: "range over a string", Run: rangeOverString},
		{Name: "range over an integer", Run: rangeOverInteger},
		{Name: "break, continue, labels", Run: breakContinueAndLabels},
		{Name: "loop variable per iteration", Run: loopVariablePerIteration},
		{Name: "switch", Run: switchExamples},
		{Name: "type switch", Run: typeSwitchExamples},
	})
}
