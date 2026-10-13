package main

import "fmt"

/*
for is Go's ONLY loop. It covers every case:
 for i := 0; i < n; i++ { }    classic
 for condition { }             like "while" (Go has no while keyword)
 for { }                       infinite, leave with break or return
 for i, v := range x { }       over slices, arrays, strings, maps, channels
 for i := range 10 { }         over an integer (Go 1.22)
break, continue and labels work as in other languages.
*/

func classicFor() {
	for i := 1; i < 5; i++ {
		fmt.Print(i, " ") // 1 2 3 4
	}
	fmt.Println()
}

func forAsWhile() {
	i := 1
	for i < 3 {
		fmt.Println(i)
		i++
	}
}

func infiniteLoop() {
	count := 0
	for {
		count++
		if count == 3 {
			break // without this, the loop never ends
		}
	}
	fmt.Println("stopped at", count)
}

func rangeOverSlice() {
	studentRanks := []string{"raju", "ravi", "rani"}
	for i := 0; i < len(studentRanks); i++ {
		fmt.Println(i+1, "==>", studentRanks[i])
	}
	for i, name := range studentRanks {
		fmt.Println(i+1, "==>", name)
	}
	for _, name := range studentRanks { // _ ignores the index
		fmt.Print(name, " ")
	}
	fmt.Println()
}

func rangeOverMap() {
	ranks := map[string]string{"subbu": "1st", "ram": "2nd", "sita": "3rd"}
	for key, value := range ranks { // order is RANDOM for maps
		fmt.Println(key, value)
	}
}

func rangeOverInteger() {
	for i := range 3 { // Go 1.22
		fmt.Print(i, " ") // 0 1 2
	}
	fmt.Println()
}

func breakContinueAndLabels() {
	for i := range 10 {
		if i%2 == 0 {
			continue
		}
		if i > 7 {
			break
		}
		fmt.Print(i, " ") // 1 3 5 7
	}
	fmt.Println()

outer:
	for i := 1; i <= 3; i++ {
		for j := 1; j <= 3; j++ {
			if i*j == 4 {
				fmt.Println("found 4 at", i, j)
				break outer // leaves BOTH loops
			}
		}
	}
}

func loopVariablePerIteration() {
	// Since Go 1.22 each iteration has its OWN copy of the loop variable,
	// so closures capture the value you expect.
	var funcs []func() int
	for i := range 3 {
		funcs = append(funcs, func() int { return i })
	}
	for _, f := range funcs {
		fmt.Print(f(), " ") // 0 1 2  (before Go 1.22 this printed 3 3 3)
	}
	fmt.Println()
}
