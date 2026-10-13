package main

import (
	"fmt"
	"time"
)

/*
Two goroutines interleave their work: while one sleeps, the other runs.
*/

func numbers() {
	for i := 1; i <= 5; i++ {
		time.Sleep(25 * time.Millisecond)
		fmt.Printf("%d ", i)
	}
}

func alphabets() {
	for c := 'a'; c <= 'e'; c++ {
		time.Sleep(40 * time.Millisecond)
		fmt.Printf("%c ", c)
	}
}

func interleaving() {
	go numbers()
	go alphabets()
	time.Sleep(300 * time.Millisecond)
	fmt.Println("\nmain finished") // e.g. 1 a 2 3 b 4 c 5 d e
}
