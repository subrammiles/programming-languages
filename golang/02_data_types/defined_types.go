package main

import "fmt"

/*
The type keyword
 type Celsius float64        a NEW, distinct type with float64 underneath
 type ID = string            an ALIAS: just another name for string
A defined type can have its own methods and is not mixed up with others by accident.
*/

type Celsius float64
type Fahrenheit float64
type UserID = string // alias

func definedTypes() {
	type MyType int
	var num MyType = 10
	fmt.Println("Num:", num)

	var boiling Celsius = 100
	var body Fahrenheit = 98.6
	// fmt.Println(boiling + body) // compile error: mismatched types Celsius and Fahrenheit
	fmt.Println(boiling, body, Fahrenheit(boiling*9/5+32)) // 100 98.6 212

	var id UserID = "u-42"
	var s string = id            // fine: an alias IS the same type
	fmt.Printf("%T %s\n", id, s) // string u-42
}
