package main

import (
	"fmt"
	"reflect"
	"strconv"
)

/*
Reflection with the reflect package: inspect and change values whose type is only known at runtime.
  reflect.TypeOf(x)  -> the type (name, kind, fields, methods, struct tags)
  reflect.ValueOf(x) -> the value (read it, and set it if it is addressable)
  Kind is the underlying category: Struct, Slice, Map, Int, String, Ptr ...

encoding/json, fmt, ORMs and validation libraries use reflection to read struct tags.
Rules of thumb: reflection is slower, skips compile-time checks, and panics on mistakes.
Prefer interfaces or generics; reach for reflect only for truly generic tooling.
*/

type Signup struct {
	Name  string `validate:"required" json:"name"`
	Email string `validate:"required" json:"email"`
	Age   int    `validate:"min=18" json:"age"`
	notes string // unexported: reflection can read the field info but not set it
}

func reflectionBasics() {
	for _, x := range []any{42, "hi", 3.14, []int{1}, map[string]int{}, Signup{}, &Signup{}} {
		t := reflect.TypeOf(x)
		fmt.Printf("%-18s kind=%s\n", t, t.Kind())
	}
	// int                kind=int
	// string             kind=string
	// float64            kind=float64
	// []int              kind=slice
	// map[string]int     kind=map
	// main.Signup        kind=struct
	// *main.Signup       kind=ptr

	// Walking struct fields and tags
	t := reflect.TypeOf(Signup{})
	for f := range t.Fields() { // Go 1.26: iterator over fields (older: for i := range t.NumField())
		fmt.Printf("%s %s json=%q validate=%q exported=%v\n",
			f.Name, f.Type, f.Tag.Get("json"), f.Tag.Get("validate"), f.IsExported())
	}
	// Name string json="name" validate="required" exported=true
	// Email string json="email" validate="required" exported=true
	// Age int json="age" validate="min=18" exported=true
	// notes string json="" validate="" exported=false
}

// validate is a tiny tag-driven validator, like the ones in popular libraries.
func validate(s any) []string {
	var problems []string
	v := reflect.ValueOf(s)
	t := v.Type()
	for i := range t.NumField() {
		field, value := t.Field(i), v.Field(i)
		switch rule := field.Tag.Get("validate"); {
		case rule == "required" && value.IsZero():
			problems = append(problems, field.Name+" is required")
		case len(rule) > 4 && rule[:4] == "min=":
			limit, _ := strconv.Atoi(rule[4:])
			if value.Int() < int64(limit) {
				problems = append(problems, fmt.Sprintf("%s must be at least %d", field.Name, limit))
			}
		}
	}
	return problems
}

func reflectionValidator() {
	fmt.Println(validate(Signup{Name: "Ann", Email: "ann@example.com", Age: 30})) // []
	fmt.Println(validate(Signup{Age: 15}))
	// [Name is required Email is required Age must be at least 18]
}

func reflectionSetting() {
	s := Signup{Name: "Ann"}
	v := reflect.ValueOf(&s).Elem() // a pointer is needed to make the value settable
	v.FieldByName("Name").SetString("Bo")
	v.FieldByName("Age").SetInt(40)
	fmt.Println(s.Name, s.Age)                                   // Bo 40
	fmt.Println(v.FieldByName("notes").CanSet())                 // false (unexported)
	fmt.Println(reflect.ValueOf(s).FieldByName("Name").CanSet()) // false (a copy, not addressable)

	// Calling a method by name
	m := reflect.ValueOf(strconv.Itoa)
	out := m.Call([]reflect.Value{reflect.ValueOf(123)})
	fmt.Println(out[0].String() + "!") // 123!

	// DeepEqual compares slices, maps and structs by content
	fmt.Println(reflect.DeepEqual([]int{1, 2}, []int{1, 2}), reflect.DeepEqual(map[string]int{"a": 1}, map[string]int{"a": 2})) // true false
}
