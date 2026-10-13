package main

import (
	"fmt"
)

func loopThroughStrings() {
	text := "Subbu"

	// for range loop to iterate through a string
	for _, character := range text {
		fmt.Printf("%c\n", character)
	}
}
