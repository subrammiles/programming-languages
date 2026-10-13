/*
for i, v := range data_structure {
    // code to process element v at index i
}
*/

package main

import "fmt"

func main() {
	var str = "Hello Go"
	for i, v := range str {
		fmt.Printf("length_of_String[%d] = %d \n", i, v)
	}
}
