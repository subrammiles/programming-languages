package main

import "fmt"

/*
Zero values: a variable declared without a value is never "undefined".
 numbers -> 0     bool -> false     string -> ""
 pointers, slices, maps, channels, functions, interfaces -> nil
 structs -> every field set to its zero value
*/

func zeroValues() {
	var i int
	var f float64
	var b bool
	var s string
	var p *int
	var sl []int
	var m map[string]int
	fmt.Println(i, f, b, s == "", p, sl == nil, m == nil) // 0 0 false true <nil> true true

	type point struct{ X, Y int }
	var pt point
	fmt.Printf("%+v\n", pt) // {X:0 Y:0}
}
