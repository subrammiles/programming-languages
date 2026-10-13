package main

import (
	"encoding/json"
	"fmt"
)

/*
Embedding: put a type inside a struct WITHOUT a field name.
Its fields and methods are "promoted": you can use them directly.
This is Go's composition-over-inheritance answer.

Struct tags: metadata in backticks read by packages like encoding/json.
*/

type Address struct {
	City    string
	Country string
}

func (a Address) Label() string { return a.City + ", " + a.Country }

type Employee struct {
	Person  // embedded: Employee "has" Name and Age directly
	Address // and City, Country and Label()
	Salary  int
}

func embedding() {
	e := Employee{
		Person:  Person{Name: "Asha", Age: 30},
		Address: Address{City: "Hyderabad", Country: "India"},
		Salary:  90000,
	}
	fmt.Println(e.Name, e.City) // promoted fields: Asha Hyderabad
	fmt.Println(e.Label())      // promoted method: Hyderabad, India
	fmt.Println(e.Person.Name)  // the full path also works
}

type Product struct {
	ID       int      `json:"id"`
	Name     string   `json:"name"`
	Price    float64  `json:"price,omitempty"`
	Tags     []string `json:"tags,omitempty"`
	internal string   // lowercase: not exported, ignored by json
}

func structTags() {
	p := Product{ID: 1, Name: "pen", internal: "hidden"}
	data, _ := json.Marshal(p)
	fmt.Println(string(data)) // {"id":1,"name":"pen"}
}
