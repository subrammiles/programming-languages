package main

import (
	"fmt"
)

/*Pointer vs Value receiver*/
type Salary struct {
	amount int
}

// Value receiver
func (s Salary) increaseSalaryValue(increment int) int {
	s.amount = s.amount + increment
	return s.amount
}

// Pointer receiver
func (s *Salary) increaseSalaryPointer(increment int) int {
	s.amount = s.amount + increment
	return s.amount
}

func pointerVsValueReceiver() {
	/*Value reciver*/
	salary1 := Salary{1000}
	temp := salary1.increaseSalaryValue(100)
	fmt.Println(temp)           //1100
	fmt.Println(salary1.amount) //1000
	/*pointer reciver*/
	salary2 := Salary{1000}
	salary2.increaseSalaryPointer(100)
	fmt.Println(salary2.amount) //1100
}
