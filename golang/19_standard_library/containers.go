package main

import (
	"container/heap"
	"container/list"
	"container/ring"
	"fmt"
)

/*
container/heap, container/list, container/ring
Go has no built-in priority queue, linked list or circular buffer type; these packages provide them.

  heap -> a priority queue on top of YOUR slice type: implement sort.Interface + Push + Pop,
          then use heap.Init / heap.Push / heap.Pop. Push and Pop are O(log n).
  list -> a doubly linked list (used for LRU caches)
  ring -> a circular list (e.g. "keep the last N values")
*/

// IntHeap is a min-heap of ints.
type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] } // < gives a min-heap; > a max-heap
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() any {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

// Task is an item in a priority queue of tasks.
type Task struct {
	name     string
	priority int
}

type TaskQueue []Task

func (q TaskQueue) Len() int           { return len(q) }
func (q TaskQueue) Less(i, j int) bool { return q[i].priority > q[j].priority } // highest first
func (q TaskQueue) Swap(i, j int)      { q[i], q[j] = q[j], q[i] }
func (q *TaskQueue) Push(x any)        { *q = append(*q, x.(Task)) }
func (q *TaskQueue) Pop() any {
	old := *q
	t := old[len(old)-1]
	*q = old[:len(old)-1]
	return t
}

func heaps() {
	h := &IntHeap{5, 2, 8}
	heap.Init(h) // arrange the slice into heap order: O(n)
	heap.Push(h, 1)
	heap.Push(h, 9)
	fmt.Println("smallest:", (*h)[0]) // smallest: 1
	for h.Len() > 0 {
		fmt.Print(heap.Pop(h), " ") // always use heap.Pop, not h.Pop
	}
	fmt.Println() // 1 2 5 8 9

	q := &TaskQueue{}
	heap.Push(q, Task{"write docs", 1})
	heap.Push(q, Task{"fix prod bug", 10})
	heap.Push(q, Task{"code review", 5})
	for q.Len() > 0 {
		t := heap.Pop(q).(Task)
		fmt.Printf("%s (%d)\n", t.name, t.priority)
	}
	// fix prod bug (10)
	// code review (5)
	// write docs (1)

	// Classic use: the k largest numbers with a min-heap of size k
	nums := []int{7, 10, 4, 3, 20, 15}
	k := 3
	top := &IntHeap{}
	for _, n := range nums {
		heap.Push(top, n)
		if top.Len() > k {
			heap.Pop(top) // drop the smallest
		}
	}
	fmt.Println("3 largest, smallest of them first:", (*top)[0]) // 3 largest, smallest of them first: 10
}

func linkedList() {
	l := list.New()
	l.PushBack("b")
	l.PushBack("c")
	front := l.PushFront("a")
	l.InsertAfter("a2", front)

	for e := l.Front(); e != nil; e = e.Next() {
		fmt.Print(e.Value, " ")
	}
	fmt.Println() // a a2 b c

	l.MoveToBack(front) // O(1): this is what makes an LRU cache fast
	l.Remove(l.Front()) // removes "a2"
	for e := l.Front(); e != nil; e = e.Next() {
		fmt.Print(e.Value, " ")
	}
	fmt.Println("len", l.Len()) // b c a len 3
}

func ringBuffer() {
	// Keep only the last 3 readings
	r := ring.New(3)
	for _, reading := range []int{10, 20, 30, 40, 50} {
		r.Value = reading
		r = r.Next() // overwrite the oldest value next time
	}
	sum := 0
	r.Do(func(v any) {
		fmt.Print(v, " ")
		sum += v.(int)
	})
	fmt.Println("avg", sum/3) // 30 40 50 avg 40
}
