package main

import (
	"fmt"
	"strings"
)

func accessCharactersOfString() {
	/*
	   string is a sequence of characters.
	   Hence, we can access individual characters of a string.
	*/
	// create and initialize a string
	name := "Programiz"

	// use len() function to count length
	stringLength := len(name)

	fmt.Println("Length of a string is:", stringLength)

	// access first character
	fmt.Printf("%c\n", name[0]) // P

	// access fourth character
	fmt.Printf("%c\n", name[3]) // g

	// access last character
	fmt.Printf("%c", name[8]) // z
}

func stringsAreImmutable() {
	/*strings are immutable. This means once we create a string,
	we cannot change it.*/

	message := "Go"
	message = message + " " + "Lang"

	/*Here, we are using the + operator to add another string "String"
		to the previous string.It looks like we can change the value of
		the previous string. However, this is not true.
	    go creates the first string "Go"
		It then creates another string by joining the first string with "Lang"
		assigns the new string to message
		the first string "Go" remains unchanged.
	*/
}

func stringCompare() {
	// create three strings
	string1 := "Programiz"
	string2 := "Programiz Pro"
	string3 := "Programiz"

	// compare strings
	fmt.Println(strings.Compare(string1, string2)) // -1
	fmt.Println(strings.Compare(string2, string3)) // 1
	fmt.Println(strings.Compare(string1, string3)) // 0

	/*
		strings.Compare(string1, string2)
		to compare two strings: string1 and string2. The function returns:
		-1 because string1 is smaller than string2
		1 because string2 is greater than string3
		0 because string1 and string3 are equal
	*/

}

func checkIfStringContainsSubstring() {
	/*
	 To check if a substring is present inside a string,
	 we use the Contains() method of the Go strings package.
	*/
	text := "Go Programming"
	substring1 := "Go"
	substring2 := "Golang"

	// check if Go is present in Go Programming
	result := strings.Contains(text, substring1)
	fmt.Println(result)

	// check if Golang is present in Go Programming
	result = strings.Contains(text, substring2)
	fmt.Println(result)

}

func replaceAString() {
	/*
			strings.Replace(text, "r", "t", 1)
		Here,
		text - string where we perform the replace operation
		"r" - old character that needs to be replaced
		"t" - new character that replaces the old character
		1 - represents how many old characters to be replaced
	*/
	fmt.Println(strings.Replace("car", "r", "t", 1))       //cat
	fmt.Println(strings.Replace("Programiz", "r", "R", 2)) //PRogRamiz
}

func changeCaseOfString() {
	text1 := "go is fun to learn"
	// convert to uppercase
	text1 = strings.ToUpper(text1)
	fmt.Println(text1)
	text2 := "I LOVE GOLANG"
	// convert to lowercase
	text2 = strings.ToLower(text2)
	fmt.Println(text2)
}

func splitStrings() {
	var message = "I Love Golang"
	// split string from space " "
	splittedString := strings.Split(message, " ")
	fmt.Println(splittedString) //[I Love Golang]
}

func compareStringWithEqualOperator() {
	//we can also use the == operator to compare two strings
	// create 2 strings
	string1 := "Programiz"
	string2 := "programiz"

	// compare two strings
	result := string1 == string2

	fmt.Println(result)

}

func createStringsFromASlice() {
	/*
	 can also create a string by joining all the elements of a string slice
	*/
	// create a string slice
	words := []string{"I", "love", "Golang"}

	// join each element of the slice
	message := strings.Join(words, " ")
	fmt.Println(message)
}

func main() {
	//fmt.Println("Subbu\Gabbu");
	//fmt.Println('Subbu\Gabbu');
	fmt.Print("test")
	escapeSequencesInString()
}
