package main

import (
	"fmt"
	"strings"
)

/*
Method values, method expressions and method sets

Method VALUE:      c.Inc        -> a func() bound to that receiver c (like bind in JS)
Method EXPRESSION: (*Counter).Inc -> a func(c *Counter); the receiver becomes the first argument

METHOD SETS decide which types satisfy an interface:
  - type T  has the methods with VALUE receivers   (func (t T) M())
  - type *T has BOTH value and pointer receiver methods
So if any interface method has a pointer receiver, only *T satisfies the interface.
(You can still CALL pointer methods on an addressable T variable: Go takes &t for you.)
*/

type Counter struct{ n int }

func (c *Counter) Inc()          { c.n++ }
func (c Counter) Value() int     { return c.n }
func (c Counter) String() string { return fmt.Sprintf("Counter(%d)", c.n) }

type Incrementer interface{ Inc() }

func methodValues() {
	c := &Counter{}
	inc := c.Inc // method value: remembers c
	inc()
	inc()
	fmt.Println(c.Value()) // 2

	// handy as callbacks: pass it anywhere a func() is expected
	runTwice := func(f func()) { f(); f() }
	runTwice(inc)
	fmt.Println(c.Value()) // 4

	upper := strings.ToUpper // a plain function value
	shout := strings.NewReplacer("!", "!!!").Replace
	fmt.Println(shout(upper("hi!"))) // HI!!!

	// method expressions
	incFn := (*Counter).Inc  // func(*Counter)
	valueFn := Counter.Value // func(Counter) int
	other := &Counter{n: 10}
	incFn(other)
	fmt.Println(valueFn(*other)) // 11
}

func methodSets() {
	var c Counter
	c.Inc()                // OK: c is addressable, Go calls (&c).Inc()
	fmt.Println(c.Value()) // 1

	var i Incrementer = &c // *Counter has Inc
	i.Inc()
	fmt.Println(c) // Counter(2)

	// var j Incrementer = c   // compile error: Counter does not implement Incrementer
	//                         // (method Inc has pointer receiver)

	// Values stored in a map are not addressable, so pointer methods cannot be called on them
	counters := map[string]Counter{"a": {}}
	// counters["a"].Inc()     // compile error: cannot take the address of counters["a"]
	tmp := counters["a"]
	tmp.Inc()
	counters["a"] = tmp
	fmt.Println(counters["a"].Value()) // 1
}
