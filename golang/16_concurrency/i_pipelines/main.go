// Pipelines, fan-out and fan-in.
//
//	go run ./16_concurrency/i_pipelines
//
// A pipeline is a chain of stages connected by channels. Each stage:
// receives from an input channel, does some work, sends to an output channel,
// and closes its output when its input is finished.
package main

import (
	"fmt"
	"slices"
	"sync"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

func generate(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
		}
	}()
	return out
}

func square(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for n := range in {
			out <- n * n
		}
	}()
	return out
}

func filterEven(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for n := range in {
			if n%2 == 0 {
				out <- n
			}
		}
	}()
	return out
}

func pipeline() {
	for v := range filterEven(square(generate(1, 2, 3, 4, 5, 6))) {
		fmt.Print(v, " ") // 4 16 36
	}
	fmt.Println()
}

// merge (fan-in) combines several channels into one
func merge(channels ...<-chan int) <-chan int {
	out := make(chan int)
	var wg sync.WaitGroup
	for _, ch := range channels {
		wg.Go(func() {
			for v := range ch {
				out <- v
			}
		})
	}
	go func() {
		wg.Wait()
		close(out)
	}()
	return out
}

func fanOutFanIn() {
	source := generate(1, 2, 3, 4, 5, 6, 7, 8)
	// fan-out: three squarers read from the same source
	workers := []<-chan int{square(source), square(source), square(source)}
	var results []int
	for v := range merge(workers...) {
		results = append(results, v)
	}
	slices.Sort(results) // arrival order varies, so sort to compare
	fmt.Println(results) // [1 4 9 16 25 36 49 64]
}

func main() {
	examples.Run([]examples.Example{
		{Name: "pipeline", Run: pipeline},
		{Name: "fan-out and fan-in", Run: fanOutFanIn},
	})
}
