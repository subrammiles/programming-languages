package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func getUserAge() string {
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
	return sb

}

func getUser() string {
	response, error := http.Get("https://randomuser.me/api/")

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
	return sb

}

func main() {

	output1 := getUserAge()

	fmt.Println(output1)

	output2 := getUser()

	fmt.Println(output2)

	fmt.Println("test")

}
