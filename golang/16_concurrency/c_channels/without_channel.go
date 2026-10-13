package main

import (
	"fmt"
	"time"
)

/*
Without a channel, a goroutine's return value is LOST: go f() discards it,
and we have to sleep to see the printed output.
*/

func multiplyByTwoAndPrint(num int) int {
	result := num * 2
	fmt.Println(result)
	return result // nobody can receive this
}

func withoutChannel() {
	go multiplyByTwoAndPrint(3)
	time.Sleep(50 * time.Millisecond)
}
