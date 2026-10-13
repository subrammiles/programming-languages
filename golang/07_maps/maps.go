package main

import "fmt"

/*
Maps: key -> value.   map[KeyType]ValueType
 - keys must be comparable (string, int, bool, structs of those, arrays ...), not slices or maps
 - the zero value is nil: reading a nil map is fine, WRITING to it panics
 - create with a literal {} or make()
*/

func declaringAMap() {
	var nilMap map[string]string
	fmt.Println(nilMap, nilMap == nil, len(nilMap), nilMap["x"] == "") // map[] true 0 true
}

func writingToANilMapPanics() {
	defer func() {
		fmt.Println("recovered:", recover()) // assignment to entry in nil map
	}()
	var m map[string]int
	m["one"] = 1
}

func initialisingMaps() {
	m1 := map[string]int{} // empty literal
	m1["one"] = 1
	m2 := make(map[string]int)      // the same with make
	m3 := make(map[string]int, 100) // with a size hint
	m2["two"] = 2
	fmt.Println(m1, m2, len(m3)) // map[one:1] map[two:2] 0
}

func mapLiterals() {
	animals := map[int]string{
		90: "Dog",
		91: "Cat",
		92: "Cow",
	}
	fmt.Println(animals)

	people := map[int]struct {
		name string
		age  int
	}{1: {"subbu", 12}, 2: {"gabbu", 12}}
	fmt.Println(people[1].name) // subbu

	ages := map[string][]int{"cat": {2, 1}, "dog": {5}}
	fmt.Println(ages["cat"]) // [2 1]

	salaries := map[string]int{"steve": 12000, "jamie": 15000}
	salaries["subbu"] = 2000
	fmt.Println(len(salaries)) // 3
}

func iteratingAMap() {
	squared := map[int]int{2: 4, 3: 9, 4: 16, 5: 25}
	for number, square := range squared { // order changes from run to run
		fmt.Printf("square of %d is %d\n", number, square)
	}
}
