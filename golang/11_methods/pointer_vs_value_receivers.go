package main

import "fmt"

/*
Value receiver   func (s Salary) ...   works on a COPY; cannot change the original
Pointer receiver func (s *Salary) ...  works on the original; no copying
Rules of thumb:
 - use a pointer receiver if the method changes the receiver, or the struct is large
 - keep all methods of a type consistent (all pointer or all value)
Go automatically takes the address: salary.raise() works even when salary is not a pointer.
*/

type salary struct {
	amount int
}

func (s salary) raiseCopy(increment int) int {
	s.amount += increment
	return s.amount
}

func (s *salary) raise(increment int) {
	s.amount += increment
}

func pointerVsValueReceiver() {
	s1 := salary{1000}
	fmt.Println(s1.raiseCopy(100)) // 1100
	fmt.Println(s1.amount)         // 1000 -> unchanged

	s2 := salary{1000}
	s2.raise(100)          // Go rewrites this as (&s2).raise(100)
	fmt.Println(s2.amount) // 1100
}
