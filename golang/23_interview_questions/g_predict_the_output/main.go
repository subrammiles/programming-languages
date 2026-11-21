// Predict the output: Go gotchas that interviewers love.
//
//	go run ./23_interview_questions/g_predict_the_output
//
// Cover the comments, guess, then run.
package main

import (
	"errors"
	"fmt"
	"os"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

// Q1: defer runs in LIFO order, and its ARGUMENTS are evaluated when defer is reached.
func deferOrder() {
	for i := range 3 {
		defer fmt.Print(i, " ")
	}
	x := 1
	defer fmt.Println("deferred x =", x)                   // x is evaluated NOW (1)
	defer func() { fmt.Print("closure x = ", x, " | ") }() // a closure reads x LATER (2)
	x = 2
	// closure x = 2 | deferred x = 1
	// 2 1 0
}

// Q2: a deferred closure can change named return values.
func namedResult() (n int) {
	defer func() { n *= 10 }()
	return 5 // sets n = 5, then the defer runs
}

func deferAndReturn() {
	fmt.Println(namedResult()) // 50
}

// Q3: append and shared backing arrays.
func appendAliasing() {
	a := make([]int, 3, 10) // len 3, cap 10
	b := append(a, 4)       // fits in capacity: b shares a's array
	c := append(a, 5)       // ALSO writes index 3 of the same array!
	fmt.Println(b[3], c[3]) // 5 5

	x := []int{1, 2, 3} // len 3, cap 3
	y := append(x, 4)   // no room: a new array is allocated
	y[0] = 99
	fmt.Println(x[0], y[0]) // 1 99

	s := []int{1, 2, 3, 4, 5}
	t := s[1:3] // [2 3], but shares s's array (cap 4)
	t = append(t, 100)
	fmt.Println(s) // [1 2 3 100 5]   (append overwrote s[3])
	// Use s[1:3:3] (a full slice expression) to limit capacity and force a copy on append.
}

// Q4: range copies values.
func rangeCopies() {
	type item struct{ n int }
	items := []item{{1}, {2}}
	for _, it := range items {
		it.n *= 10 // changes the copy only
	}
	fmt.Println(items) // [{1} {2}]
	for i := range items {
		items[i].n *= 10 // changes the element
	}
	fmt.Println(items) // [{10} {20}]

	arr := [3]int{1, 2, 3}
	for i, v := range arr { // ranging over an ARRAY copies the whole array first
		arr[2] = 100
		if i == 2 {
			fmt.Println(v) // 3
		}
	}
}

// Q5: loop variables are per-iteration since Go 1.22.
func loopVariables() {
	var funcs []func() int
	for i := range 3 {
		funcs = append(funcs, func() int { return i })
	}
	for _, f := range funcs {
		fmt.Print(f(), " ")
	}
	fmt.Println() // 0 1 2   (before Go 1.22: 3 3 3)
}

// Q6: a nil pointer inside an interface is NOT a nil interface.
type MyErr struct{}

func (*MyErr) Error() string { return "my error" }

func mayFail(fail bool) error {
	var p *MyErr // nil pointer
	if fail {
		p = &MyErr{}
	}
	return p // the interface now holds (type=*MyErr, value=nil): it is not nil!
}

func nilInterface() {
	err := mayFail(false)
	fmt.Println(err == nil)                // false
	fmt.Printf("%T %v\n", err, err == nil) // *main.MyErr false
	// Fix: return nil explicitly when there is no error.
}

// Q7: shadowing with := inside a block.
func shadowing() {
	err := errors.New("outer")
	if true {
		_, err := os.Open("does-not-exist") // a NEW err, only inside this block
		_ = err
	}
	fmt.Println(err) // outer

	x := 1
	{
		x := 2
		x++
	}
	fmt.Println(x) // 1
}

// Q8: maps.
func mapGotchas() {
	m := map[string]int{"a": 1}
	fmt.Println(m["missing"]) // 0   (zero value, no error)
	v, ok := m["missing"]
	fmt.Println(v, ok) // 0 false

	type point struct{ x int }
	pts := map[string]point{"p": {1}}
	// pts["p"].x = 2        // compile error: cannot assign to struct field in map
	p := pts["p"]
	p.x = 2
	pts["p"] = p
	fmt.Println(pts["p"].x) // 2

	var nilMap map[string]int
	fmt.Println(len(nilMap), nilMap["x"]) // 0 0   (reading a nil map is fine; writing panics)
}

// Q9: strings are bytes.
func stringGotchas() {
	s := "héllo"
	fmt.Println(len(s))   // 6   (é takes 2 bytes)
	fmt.Println(s[1])     // 195 (a byte, not a character)
	for i, r := range s { // range decodes runes; i jumps over multi-byte ones
		if r == 'l' {
			fmt.Println(i) // 3
			break
		}
	}
	// s[0] = 'H'                  // compile error: strings are immutable
	b := []byte(s)
	b[0] = 'H'
	fmt.Println(string(b)) // Héllo
}

// Q10: copying structs and arrays copies everything; slices and maps copy only the header.
func copySemantics() {
	type data struct {
		arr   [2]int
		slice []int
	}
	a := data{arr: [2]int{1, 2}, slice: []int{1, 2}}
	b := a
	b.arr[0] = 99
	b.slice[0] = 99
	fmt.Println(a.arr, a.slice) // [1 2] [99 2]
}

// Q11: recover only works inside a deferred function, in the panicking goroutine.
func recoverDemo() {
	safeDivide := func(a, b int) (result int, err error) {
		defer func() {
			if r := recover(); r != nil {
				err = fmt.Errorf("recovered: %v", r)
			}
		}()
		return a / b, nil
	}
	fmt.Println(safeDivide(10, 2)) // 5 <nil>
	fmt.Println(safeDivide(1, 0))  // 0 recovered: runtime error: integer divide by zero
}

// Q12: switch does not fall through by default.
func switchGotcha() {
	switch x := 2; x {
	case 1:
		fmt.Println("one")
	case 2:
		fmt.Println("two")
		fallthrough // explicitly continue into the next case (without checking it)
	case 3:
		fmt.Println("three")
	case 4:
		fmt.Println("four")
	}
	// two
	// three
}

func main() {
	examples.Run([]examples.Example{
		{Name: "Q1 defer order and arguments", Run: deferOrder},
		{Name: "Q2 defer and named results", Run: deferAndReturn},
		{Name: "Q3 append aliasing", Run: appendAliasing},
		{Name: "Q4 range copies", Run: rangeCopies},
		{Name: "Q5 loop variables", Run: loopVariables},
		{Name: "Q6 nil interface", Run: nilInterface},
		{Name: "Q7 shadowing", Run: shadowing},
		{Name: "Q8 maps", Run: mapGotchas},
		{Name: "Q9 strings are bytes", Run: stringGotchas},
		{Name: "Q10 copy semantics", Run: copySemantics},
		{Name: "Q11 recover", Run: recoverDemo},
		{Name: "Q12 switch fallthrough", Run: switchGotcha},
	})
}
