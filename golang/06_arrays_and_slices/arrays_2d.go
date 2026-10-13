package main

import (
	"fmt"
)

func print2Darray(a [3][2]string) {
	for _, v1 := range a {
		for _, v2 := range v1 {
			fmt.Printf("%s ", v2)
		}
		fmt.Printf("\n")
	}
}
func multiArray() {
	var my3darray [2][2]int
	fmt.Println(my3darray)
	my3darray[0][0] = 1
	my3darray[1][1] = 2
	my3darray[0][1] = 6
	my3darray[1][0] = 7
	fmt.Println(my3darray)
	my3darray2 := [2][2]int{{1, 2}, {2, 3}}
	fmt.Println(my3darray2)

}

func compare2Darrays(array1 [][]int, array2 [][]int) bool {
	if len(array1) == len(array2) {
		for i := 0; i < len(array1); i++ {
			for j := 0; j < len(array1); j++ {
				if array1[i][j] != array2[i][j] {
					return false
				}
			}
		}
		return true
	} else {
		return false
	}
}

func array2D() {
	a := [3][2]string{
		{"lion", "tiger"},
		{"cat", "dog"},
		{"pigeon", "peacock"}, //this comma is necessary.
		//The compiler will complain if you omit this comma
	}
	print2Darray(a)
	var b [3][2]string
	b[0][0] = "apple"
	b[0][1] = "samsung"
	b[1][0] = "microsoft"
	b[1][1] = "google"
	b[2][0] = "AT&T"
	b[2][1] = "T-Mobile"
	fmt.Printf("\n")
	print2Darray(b)
}
