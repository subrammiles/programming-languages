package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func getUser1Age(output1Channel chan<- string) {
	response, error := http.Get("https://api.agify.io/?name=subbu")

	/*If error is exists*/
	if error != nil {
		log.Fatalln(error)
	}

	//We Read the response body on the line below.
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatalln(err)
	}
	//Convert the body to type string
	sb := string(body)
	output1Channel <- sb

}

func getUser2Age(output1Channel chan<- string) {
	response, error := http.Get("https://api.agify.io/?name=subbu")

	/*If error is exists*/
	if error != nil {
		log.Fatalln(error)
	}

	//We Read the response body on the line below.
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatalln(err)
	}
	//Convert the body to type string
	sb := string(body)
	output1Channel <- sb

}

func main() {
	var output1Channel chan string
	output1Channel = make(chan string)

	go getUser1Age(output1Channel)

	output1 := <-output1Channel

	var output2Channel chan string
	output2Channel = make(chan string)

	go getUser2Age(output2Channel)

	output2 := <-output2Channel

	fmt.Println("Execution done ")
	fmt.Println(output1)
	fmt.Println(output2)
	fmt.Println("test")

}
