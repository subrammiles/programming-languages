package main

import "fmt"

func method1() {
	fmt.Println("<<<<<<<<Method 1: MAP define>>>>")
	//Syntax for map
	//var <name of the map> map[<data type>]<data type>
	var myMapName map[string]string
	fmt.Println(myMapName)
	//Output is map[]
}

func method2() {
	fmt.Println("<<<<<<<<Method 2: MAP Add some data to nil map>>>>")
	var myMapName map[string]int
	// myMapName["one"] = 1
	// myMapName["two"] = 2
	// fmt.Println(myMapName)
	///panic occurs with error: assignment to entry in nil map
	//Because myMapName id nil
	if myMapName != nil {
		myMapName["one"] = 1
		myMapName["two"] = 2
		fmt.Println(myMapName)
	} else {
		fmt.Println("myMapName is nil")
	}
}

func method3() {
	fmt.Println("<<<<<<<<Method 3: MAP Add some data to non nil map>>>>")
	var myMapName map[string]int
	if myMapName != nil {
		myMapName["one"] = 1
		myMapName["two"] = 2
		fmt.Println(myMapName)
	} else {
		//Syntax:add "{}" to map on right side of =
		//This will asign value
		myMapName = map[string]int{}
		myMapName["one"] = 1
		myMapName["two"] = 2
		fmt.Println("myMapName after init is ")
		fmt.Println(myMapName)
	}
}

func method4() {
	fmt.Println("<<<<<<<<Method 4: Using short varible declaration>>>>")
	///Syntax:
	////myvar := map[<datayype>]<datatype>{}
	map_1 := map[int]int{}
	map_2 := map[int]string{}
	map_3 := map[int]bool{}
	map_4 := map[string]int{}
	map_5 := map[string]string{}
	map_6 := map[float64]int{}
	//In struct first curly braces belongs to struct and second one belongs to map
	map_7 := map[int]struct{}{}
	map_8 := map[string][]int{}
	map_9 := map[int]int{}
	fmt.Println(map_1)
	fmt.Println(map_2)
	fmt.Println(map_3)
	fmt.Println(map_4)
	fmt.Println(map_5)
	fmt.Println(map_6)
	fmt.Println(map_7)
	fmt.Println(map_8)
	fmt.Println(map_9)
}

func method5() {
	fmt.Println("<<<<<<<<Method 5: Creating and initializing and adding data at the same time>>>>")
	/////////First way
	// One way to add data is Creating and initializing empty map
	// Using var keyword and add data later as shown
	var map_1 map[int]string
	if map_1 == nil {
		// Checking if the map is nil or not
		fmt.Println("Map is nil")
		map_1 = map[int]string{}
		map_1[90] = "Dog"
		map_1[91] = "Cat"
		fmt.Println("Map-1: ", map_1)
	} else {
		map_1[90] = "Dog"
		map_1[91] = "Cat"
	}
	// We can do all Creating and initializing a map and adding data
	// Using shorthand declaration and
	// using map literals
	map_2 := map[int]string{
		90: "Dog",
		91: "Cat",
		92: "Cow",
		93: "Bird",
		94: "Rabbit",
	}
	fmt.Println("Map-2: ", map_2)
}
func method6() {
	map_1 := map[int]int{
		1: 100,
		2: 200,
	}
	map_2 := map[int]string{
		1: "subbu",
		2: "gabbu",
	}
	map_3 := map[int]bool{
		1: true,
		2: false,
	}
	map_4 := map[string]int{
		"subbu": 1,
		"rasma": 60,
	}
	map_5 := map[string]string{
		"mys1": "hi",
		"mys2": "bye",
	}
	map_6 := map[float64]int{
		22.1: 22,
		33.3: 33,
	}
	///struct
	map_7 := map[int]struct {
		name string
		age  int
	}{1: {name: "subbu", age: 12}, 2: {name: "gabbu", age: 12}}

	///Array
	map_8 := map[string][]int{
		"cat": {2, 1},
		"dog": {5},
	}
	fmt.Println(map_1)
	fmt.Println(map_2)
	fmt.Println(map_3)
	fmt.Println(map_4)
	fmt.Println(map_5)
	fmt.Println(map_6)
	fmt.Println(map_7)
	fmt.Println(map_8)

}

// //////More examples
func map3() {
	var map_1 map[int]int
	var map_2 map[int]string
	var map_3 map[int]bool
	var map_4 map[string]int
	var map_5 map[string]string
	var map_6 map[float64]int
	var map_7 map[int]struct{}
	var map_8 map[string][]int
	var map_9 map[int]int
	fmt.Println(map_1)
	fmt.Println(map_2)
	fmt.Println(map_3)
	fmt.Println(map_4)
	fmt.Println(map_5)
	fmt.Println(map_6)
	fmt.Println(map_7)
	fmt.Println(map_8)
	fmt.Println(map_9)
}

func mapWithOutInit() {
	var map_1 map[int]int
	if map_1 == nil {
		map_1 = map[int]int{
			1: 1,
			2: 2,
		}
		fmt.Println(map_1)
	} else {
		fmt.Println("False")
	}
}

func method7() {
	employeeSalary := make(map[string]int)
	fmt.Println(employeeSalary)
	employeeSalary2 := make(map[string]int)
	employeeSalary2["subbu"] = 2000
	employeeSalary2["ravi"] = 3000
	fmt.Println(employeeSalary2)
	employeeSalary3 := map[string]int{
		"steve": 12000,
		"jamie": 15000,
	}
	fmt.Println(employeeSalary3)
}

func iterateOverMap() {
	// create a map
	squaredNumber := map[int]int{2: 4, 3: 9, 4: 16, 5: 25}

	// for-range loop to iterate through each key-value of map
	for number, squared := range squaredNumber {
		fmt.Printf("Square of %d is %d\n", number, squared)
	}
}
func main() {
	method1()
	method2()
	method3()
	method4()
	method5()
	method6()
	iterateOverMap()
}
