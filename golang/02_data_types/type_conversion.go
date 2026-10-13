package main

import (
	"fmt"
	"strconv"
)

/*
Go never converts types automatically. You must write T(value).
 int(x)  float64(x)  string(rune)  []byte(s)  []rune(s)
For text <-> numbers use strconv, not string(n).
*/

func floatAndIntConversion() {
	i := 55
	j := 67.5
	// sum := i + j // compile error: mismatched types int and float64
	fmt.Println(i + int(j))     // 122 -> int() drops the decimal part
	fmt.Println(float64(i) + j) // 122.5
}

func runesAndCharacters() {
	char := 'a'
	fmt.Println(string(char), ":", int(char)) // a : 97
	fmt.Println(65, ":", string(rune(65)))    // 65 : A
	// string(65) also gives "A", which surprises people; go vet warns about it
}

func stringsAndNumbers() {
	n, err := strconv.Atoi("42")
	fmt.Println(n+1, err) // 43 <nil>

	_, err = strconv.Atoi("forty-two")
	fmt.Println(err) // strconv.Atoi: parsing "forty-two": invalid syntax

	f, _ := strconv.ParseFloat("3.14", 64)
	b, _ := strconv.ParseBool("true")
	fmt.Println(f, b) // 3.14 true

	fmt.Println(strconv.Itoa(99) + " bottles") // 99 bottles
	fmt.Println(fmt.Sprint(3.5) + "%")         // 3.5%
	fmt.Println(strconv.FormatInt(255, 2))     // 11111111
}
