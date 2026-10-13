package main

import "fmt"

func functionWithIntegerArgument(myvar int) {
	/*Syntax:
	  <varible's name> int
	*/
	fmt.Println(myvar)
}

func functionWithStringArgument(myvar string) {
	/*Syntax:
	  <varible's name > string
	*/
	fmt.Println(myvar)
}

func functionWithArrayArgument(myarray []int) {
	/*Syntax:
	  <varible's name> []dataDtype
	*/
	fmt.Println(myarray)
}
func functionWithMapArgument(myvar map[int]string) {
	/*Syntax:
	  <var name > map[<data type>]<data type>
	*/
	fmt.Println(myvar)
}

func functionWithStructArgument(myvar struct {
	name string
	age  int
}) {
	/*Syntax:
	  <var name > struct{}
	*/
	fmt.Println(myvar)
}
func functionWithChannelArgument(mychannel <-chan int) {
	/*Syntax: Receive channel
	func serve(mychannel <-chan SomeType) { //do stuff }
	*/
	//Get data from a channle and assign it to varible
	x := <-mychannel
	fmt.Println(x)
	y := <-mychannel
	fmt.Println(y)
	z := <-mychannel
	fmt.Println(z)
}

func functionArgumentsTesting() {
	/*Integer*/
	functionWithIntegerArgument(2)
	/*String*/
	functionWithStringArgument("Subbu")
	/*Map*/
	mymap := map[int]string{
		1: "subbu", 2: "gabbu",
	}
	functionWithMapArgument(mymap)
	/*Array*/
	x := []int{1, 2, 3}
	functionWithArrayArgument(x)
	/*struct*/
	mystruct := struct {
		name string
		age  int
	}{
		name: "subbu",
		age:  12,
	}
	functionWithStructArgument(mystruct)
	/*channel*/
	/*   //Sending to channel
		func serve(ch <-chan SomeType) { //do stuff }
		//Writing to channel
	    func serve(ch chan<- SomeType) { //do stuff }
	*/
	myIntChannel := make(chan int)
	//We are sending data to vhannel
	go func() {
		myIntChannel <- 100
		myIntChannel <- 1000
		myIntChannel <- 10000
		myIntChannel <- 100000
	}()
	functionWithChannelArgument(myIntChannel)
}
