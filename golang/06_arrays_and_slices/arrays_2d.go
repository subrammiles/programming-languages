package main

import "fmt"

/*
Multi-dimensional arrays: an array of arrays.
*/

func print2DArray(a [3][2]string) {
	for _, row := range a {
		for _, cell := range row {
			fmt.Printf("%s ", cell)
		}
		fmt.Println()
	}
}

func twoDimensionalArrays() {
	var grid [2][2]int
	grid[0][0] = 1
	grid[1][1] = 2
	fmt.Println(grid) // [[1 0] [0 2]]

	animals := [3][2]string{
		{"lion", "tiger"},
		{"cat", "dog"},
		{"pigeon", "peacock"}, // this trailing comma is required
	}
	print2DArray(animals)

	matrix := [][]int{{1, 2, 3}, {4, 5, 6}} // a slice of slices: rows can differ in length
	for _, row := range matrix {
		fmt.Println(row)
	}
}
