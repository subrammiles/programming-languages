// WaitGroups.
//
//	go run ./16_concurrency/b_waitgroup
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "classic WaitGroup", Run: classicWaitGroup},
		{Name: "WaitGroup.Go (Go 1.25)", Run: waitGroupGo},
	})
}
