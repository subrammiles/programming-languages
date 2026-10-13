package main

import "fmt"

/*
When are pointers used?
 1. to let a function change the caller's variable
 2. to avoid copying large structs
 3. for methods that modify their receiver (see 11_methods)
 4. to express "optional": a nil pointer means "no value"
Go has NO pointer arithmetic, and it's safe to return a pointer to a local variable:
the garbage collector keeps it alive.
*/

type account struct {
	owner   string
	balance int
}

func deposit(a *account, amount int) {
	a.balance += amount // Go lets you write a.balance instead of (*a).balance
}

func newAccount(owner string) *account {
	acc := account{owner: owner} // a local variable...
	return &acc                  // ...safely returned by pointer ("escapes" to the heap)
}

func pointersToStructs() {
	acc := newAccount("Asha")
	deposit(acc, 500)
	deposit(acc, 250)
	fmt.Println(acc.owner, acc.balance) // Asha 750
}

func newAndOptionalValues() {
	p := new(int) // new(T) allocates a zero T and returns *T
	*p = 7
	fmt.Println(*p) // 7

	age := new(30)    // Go 1.26: new can take an initial value
	fmt.Println(*age) // 30

	type profile struct {
		name     string
		nickname *string // nil = "not set", different from ""
	}
	nick := "Subbu"
	people := []profile{{"Subrahmanyam", &nick}, {"Ravi", nil}}
	for _, person := range people {
		if person.nickname != nil {
			fmt.Println(person.name, "goes by", *person.nickname)
		} else {
			fmt.Println(person.name, "has no nickname")
		}
	}
}
