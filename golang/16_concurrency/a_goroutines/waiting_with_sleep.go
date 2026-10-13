package main

import (
	"fmt"
	"time"
)

func displayMessage(message string) {
	fmt.Println(message)
}

func main() {
	go displayMessage("Own  Function Go Routine:Process 1")
	time.Sleep(1 * time.Second)
	displayMessage("Main Function Go Routine:Process 2")
}

/*
Expected and Actual output:
Own  Function Go Routine:Process 1
Main Function Go Routine:Process 2
*/
