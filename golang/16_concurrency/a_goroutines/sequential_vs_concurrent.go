package main

import (
	"fmt"
	"time"
)

/*
1.The below code executes two self-executing functions
inside a Golang main function,

1.In the first function code executes sequentially.
We are not using any Goroutine and the program
is executed in the same thread. We haven’t added any concurrency to the application.

2.In the 2nd function we added concurrency
*/

func sequenctialExecute() {
	start := time.Now()
	func() {
		for i := 0; i < 5; i++ {
			fmt.Println("Hello")
		}
	}()

	func() {
		for i := 0; i < 3; i++ {
			fmt.Println(i)
		}
	}()

	elapsedTime := time.Since(start)

	fmt.Println("Total Time For Execution: " + elapsedTime.String())

	time.Sleep(time.Second)
}

func concurrency() {
	start := time.Now()
	go func() {
		for i := 0; i < 5; i++ {
			fmt.Println("Hello")
		}
	}()

	go func() {
		for i := 0; i < 3; i++ {
			fmt.Println(i)
		}
	}()

	elapsedTime := time.Since(start)

	fmt.Println("Total Time For Execution: " + elapsedTime.String())

	time.Sleep(time.Second)
}

/*

 */

func main() {
	concurrency()
	//sequenctialExecute()
}

/*
Sequential output:
Hello
Hello
Hello
Hello
Hello
0
1
2
Total Time For Execution: 203.959µs
*/
/*
Concurent:
0
Hello
Hello
Hello
Hello
Hello
1
2
Total Time For Execution: 77.083µs
*/
