package main

import (
	"fmt"
)

/*
We can convert a regular function to a goroutine by calling the
function using the go keyword.

func displayMessage(){
	//code inside function
}

go displayMessage()
*/

func displayMessage(message string) {
	fmt.Println(message)
}

func main() {
	/*We are creating a coroutine using "go" keyword before function*/
	go displayMessage("Own  Function Go Routine:Process 1")
	displayMessage("Main Function Go Routine:Process 2")
}

/*
Output:Process 2
*/
/*
Only Process 2 prints because
1.We have used go with the first function call, so it is treated as a
goroutine. And the function runs independently and the main() function now
runs concurrently.
2.Hence, the second call is executed immediately and the
program terminates without completing the first function call.
3.Without completing "Process1",main terminated the application

How to solve this ?
*/

/*

Actual Output:
Main Function Go Routine:Process 2

Expected output:
Own  Function Go Routine:Process 1
Main Function Go Routine:Process 2

Reason:Main is not waiting
Solution:
In a concurrent program, the main() is always a default goroutine.
Other goroutines can not execute if the main() is not executing.

So, in order to make sure that all the goroutines are executed before
the main function ends, we sleep the process so that the other processes
get a chance to execute.
*/
