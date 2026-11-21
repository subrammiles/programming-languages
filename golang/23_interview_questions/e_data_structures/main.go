// Data structures asked in Go interviews, built with structs, pointers and generics.
//
//	go run ./23_interview_questions/e_data_structures
//	go run ./23_interview_questions/e_data_structures lru     (only the LRU cache)
//
// The standard library has container/list, container/heap and container/ring
// (see 19_standard_library/containers.go); interviews ask you to build these yourself.
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "linked list", Run: linkedListDemo},
		{Name: "stack and queue", Run: stackAndQueueDemo},
		{Name: "binary search tree", Run: bstDemo},
		{Name: "LRU cache", Run: lruDemo},
		{Name: "graph: BFS and DFS", Run: graphDemo},
	})
}
