package main

import "fmt"

/*Function with 2 input  Parameter and 2 return values */
func sumAndProductOfTwoNumbers() (int, int) {
	return (2 + 2), (2 * 2)
}

func useOfUnderScore() {
	/*Let say we want only sum,but not product,we
	can use _
	*/
	sum2, _ := sumAndProductOfTwoNumbers()
	fmt.Println(sum2)
}
