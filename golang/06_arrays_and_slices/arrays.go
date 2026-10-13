package main

import "fmt"

func test1() {
	fmt.Println("...Let Define Array of all data types......")
	var a [3]int
	var b [3]float32
	var c [4]string
	var d [5]complex64
	var e [2]rune
	var f [1]struct{}
	var g [2]map[string]int
	var h [2]chan string
	var i [2]bool
	var j [2]*int
	fmt.Println(a)
	fmt.Println(b)
	fmt.Println(c)
	fmt.Println(d)
	fmt.Println(e)
	fmt.Println(f)
	fmt.Println(g)
	fmt.Println(h)
	fmt.Println(i)
	fmt.Println(j)
}

func test2() {
	fmt.Println("...Let Define and add data of all data types......")
	var a [3]int
	a[0] = 1
	a[1] = 2
	fmt.Println("...Integers......")
	fmt.Println(a)
	var b [3]float32
	b[0] = 1.44
	b[1] = 2.88
	fmt.Println("...Float......")
	fmt.Println(b)
	var c [4]string
	c[0] = "hi"
	c[1] = "bro"
	fmt.Println("...String......")
	fmt.Println(c)
	var d [5]complex64
	d[0] = 1 + 7i
	d[1] = 1 + 6i
	fmt.Println("...Complex numbers......")
	fmt.Println(d)
	var e [2]rune
	e[0] = 'a'
	e[1] = 'r'
	fmt.Println("...Rune ......")
	fmt.Println(e)
	var f [1]struct{}
	f[0] = struct{}{}
	fmt.Println("...Struct......")
	fmt.Println(f)
	var g [2]map[string]int
	g[0] = map[string]int{"1": 1}
	fmt.Println("...Map......")
	fmt.Println(g)
	var h [2]chan string
	h[0] = make(chan string)
	h[1] = make(chan string)
	fmt.Println("...Channels......")
	fmt.Println(h)
	var i [2]bool
	i[0] = true
	i[1] = false
	fmt.Println("...Boolean ......")
	fmt.Println(i)
	var j [2]*int
	tempInt := 2
	j[0] = &tempInt
	j[1] = &tempInt
	fmt.Println("...Pointers......")
	fmt.Println(j)
}

func test3() {
	fmt.Println("...Let Define and add in one step......")
	fmt.Println("...Integers......")
	a := [2]int{1, 2}
	fmt.Println(a)

	fmt.Println("...String......")
	c := [2]string{"hi", "bro"}
	fmt.Println(c)

	fmt.Println("...Struct......")
	f := [1]struct{}{}
	fmt.Println(f)

	fmt.Println("...Map......")
	g := [2]map[string]int{}
	fmt.Println(g)
	fmt.Println("...Channels......")
}

func test4() {
	fmt.Println("... Iterate through arrays......")
	d := [...]int{12, 78, 50} //No need to specify length use 3 dots
	e := [...]string{"US", "UK", "India", "USSR"}

	for i := 0; i < len(d); i++ {
		fmt.Printf(" index = %d and value is %d \n", i, d[i])
	}
	fmt.Println("......Using Range.....")
	/*Using Range*/
	for index, value := range e {
		fmt.Printf(" index = %d and value is %s \n", index, value)
	}
}

// ///Other operations
func test5() {
	sum := addElementsInAnArray([]int{1, 2, 3, 4, 5})
	fmt.Println(sum)
	isBothAreEqual := compareArrays([]int{0, 2, 3, 4, 5}, []int{1, 2, 3, 4, 5})
	fmt.Print(isBothAreEqual)
}
func addElementsInAnArray(myarray []int) int {
	sum := 0
	for _, value := range myarray {
		sum = sum + value
	}
	return sum
}
func compareArrays(array1 []int, array2 []int) bool {
	if len(array1) == len(array2) {
		for i := 0; i < len(array1); i++ {
			if array1[i] != array2[i] {
				return false
			}
		}
		return true
	} else {
		return false
	}
}

func copyingAnArray() {
	array1 := [...]int{1, 2, 3, 4}
	array2 := array1
	array2[0] = 143
	fmt.Println(array1)
	fmt.Println(array2)
}

func arrayOfStructs() {
	type student struct {
		no   int
		name string
	}
	students := [2]student{{1, "subbu"}, {2, "jaffa"}}
	fmt.Println(students)
}

func main() {
	test1()
	test2()
	test3()
	test4()
	test5()
	array2D()
}
