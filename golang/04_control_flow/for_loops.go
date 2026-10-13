package main

import (
	"fmt"
)

func method1() {
	fmt.Println("<<<<<<<<<<<<<Method 1 Basic loop>>>>>>>>>>>")
	//No brackets required for for loop
	//     for initialization; condition; post{
	//                statements....
	//     }
	for i := 1; i < 5; i++ {
		fmt.Println(i)
	}
}

func method2() {
	fmt.Println("<<<<<<<<<<<<<Method 2 :Infinite loop>>>>>>>>>>>")
	//Don 't run system hangs
	// for {
	// 	fmt.Println(1)
	// }

}

func method3() {
	fmt.Println("<<<<<<<<<<<<<Method 3:For loop as while >>>>>>>>>>>")
	//A for loop can also work as a while loop.
	//This loop is executed until the given condition is true.
	//When the value of the given condition is false the loop ends.

	i := 1
	for i < 3 {
		fmt.Println(i)
		i = i + 1
	}
}

func method4() {
	fmt.Println("<<<<<<<<<<<<<Method 4 Simple range in for loop>>>>>>>>>>>")
	studentRanks := []string{"raju", "ravi", "rani"}
	fmt.Println(studentRanks)

	for i := 0; i < len(studentRanks); i++ {
		fmt.Println(fmt.Sprint(i+1) + "==> " + studentRanks[i])
	}
	//You can use range to capture index
	// Syntax:
	// for i, j:= range myvariable{
	//    // statement..
	// }
	fmt.Println("Range")
	for i, j := range studentRanks {
		fmt.Println(fmt.Sprint(i+1) + "==> " + j)
	}
}

func method5() {
	fmt.Println("<<<<<<<<<<<<<Method 5:Using for loop for string>>>>>>>>>>>")
	//You can use the range function to iterate over thr unicode char of the string
	myname := "subbu"

	for index, char := range myname {
		fmt.Println(fmt.Sprint(index) + " ==>" + fmt.Sprint(char) + " " + string(char))
	}
}

func method6() {
	fmt.Println("<<<<<<<<<<<<<Method 6:Using for loop for Map iteration>>>>>>>>>>>")
	myMap := map[string]string{
		"subbu": "first Rank",
		"Ram":   "2 nd rank",
		"sita":  "3rd Rank",
	}
	for key, value := range myMap {
		fmt.Println(key + " " + value)
	}
}
func method7() {
	fmt.Println("<<<<<<<<<<<<<Method 7 :channel>>>>>>>>>>>")
	/*
			A for loop can iterate over the sequential values sent on the channel until it closed.
		Syntax:
		for item := range Chnl {
		     // statements..
		}
	*/
	myIntChannel := make(chan int)
	go func() {
		myIntChannel <- 100
		myIntChannel <- 1000
		myIntChannel <- 10000
		myIntChannel <- 100000
		close(myIntChannel)
	}()
	fmt.Println("By following way  below prints one by one")
	w := <-myIntChannel
	fmt.Println(w)
	x := <-myIntChannel
	fmt.Println(x)
	y := <-myIntChannel
	fmt.Println(y)
	z := <-myIntChannel
	fmt.Println(z)

	fmt.Println("Using for loop and range")
	//We can print easly
	//Comment above lines,As data is consumed,we can't use again
	for i := range myIntChannel {
		fmt.Println(i)
	}
}

func forloop() {
	method1()
	method2()
	method3()
	method4()
	method5()
	method6()
	method7()
}
