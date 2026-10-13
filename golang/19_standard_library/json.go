package main

import (
	"encoding/json"
	jsonv2 "encoding/json/v2"
	"fmt"
	"strings"
)

/*
encoding/json
 json.Marshal(v)        Go value -> JSON bytes
 json.Unmarshal(b, &v)  JSON bytes -> Go value (pass a POINTER)
 struct tags control names:  `json:"name,omitempty"`
 only EXPORTED fields are encoded
Go 1.27 adds encoding/json/v2: faster, stricter, and more configurable.
*/

type Order struct {
	ID       int    `json:"id"`
	Customer string `json:"customer"`
	Items    []Item `json:"items"`
	Note     string `json:"note,omitempty"` // left out when empty
	Paid     bool   `json:"paid"`
}

type Item struct {
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

func jsonEncodeDecode() {
	order := Order{ID: 7, Customer: "Asha", Items: []Item{{"pen", 10}, {"book", 250}}}
	data, _ := json.Marshal(order)
	fmt.Println(string(data))
	// {"id":7,"customer":"Asha","items":[{"name":"pen","price":10},{"name":"book","price":250}],"paid":false}

	pretty, _ := json.MarshalIndent(Item{"bag", 900}, "", "  ")
	fmt.Println(string(pretty))

	var decoded Order
	err := json.Unmarshal([]byte(`{"id": 8, "customer": "Ravi", "paid": true, "extra": 1}`), &decoded)
	fmt.Printf("%+v %v\n", decoded, err) // unknown fields are ignored

	var anything map[string]any // when you don't know the shape
	json.Unmarshal([]byte(`{"a": 1, "b": [true, "x"]}`), &anything)
	fmt.Println(anything["a"], anything["b"]) // 1 [true x] -> numbers become float64

	dec := json.NewDecoder(strings.NewReader(`{"name":"pen","price":10}`)) // streams
	var it Item
	dec.Decode(&it)
	fmt.Println(it.Name)
}

func jsonV2() {
	data, _ := jsonv2.Marshal(Item{"pen", 10})
	fmt.Println(string(data)) // {"name":"pen","price":10}

	input := []byte(`{"NAME": "upper"}`)
	var v1, v2 Item
	json.Unmarshal(input, &v1)
	jsonv2.Unmarshal(input, &v2)
	fmt.Printf("v1 %q, v2 %q\n", v1.Name, v2.Name) // v1 "upper", v2 "" -> v2 matches names case-sensitively

	dup := []byte(`{"name": "pen", "name": "dup"}`)
	errV1 := json.Unmarshal(dup, &v1)
	errV2 := jsonv2.Unmarshal(dup, &v2)
	fmt.Println(errV1 == nil, errV2 != nil) // true true -> v2 rejects duplicate keys
}
