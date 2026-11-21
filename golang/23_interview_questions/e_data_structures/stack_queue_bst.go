package main

import (
	"cmp"
	"fmt"
)

// ---- Stack and queue (generic, slice-backed) ----

type Stack[T any] struct{ items []T }

func (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }
func (s *Stack[T]) Pop() (T, bool) {
	var zero T
	if len(s.items) == 0 {
		return zero, false
	}
	v := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return v, true
}
func (s *Stack[T]) Len() int { return len(s.items) }

// Queue uses a head index; the slice is compacted when half of it is dead space,
// so Dequeue is amortised O(1) without leaking memory.
type Queue[T any] struct {
	items []T
	head  int
}

func (q *Queue[T]) Enqueue(v T) { q.items = append(q.items, v) }
func (q *Queue[T]) Dequeue() (T, bool) {
	var zero T
	if q.head == len(q.items) {
		return zero, false
	}
	v := q.items[q.head]
	q.items[q.head] = zero // let the GC free it
	q.head++
	if q.head > len(q.items)/2 {
		q.items = append(q.items[:0], q.items[q.head:]...)
		q.head = 0
	}
	return v, true
}

func stackAndQueueDemo() {
	var s Stack[string]
	s.Push("a")
	s.Push("b")
	s.Push("c")
	v, _ := s.Pop()
	fmt.Println(v, s.Len()) // c 2

	var q Queue[int]
	for i := 1; i <= 4; i++ {
		q.Enqueue(i)
	}
	a, _ := q.Dequeue()
	b, _ := q.Dequeue()
	fmt.Println(a, b) // 1 2
	_, _ = q.Dequeue()
	_, _ = q.Dequeue()
	_, ok := q.Dequeue()
	fmt.Println(ok) // false
}

// ---- Binary search tree (generic over ordered keys) ----

type Tree[K cmp.Ordered] struct{ root *treeNode[K] }

type treeNode[K cmp.Ordered] struct {
	key         K
	left, right *treeNode[K]
}

func (t *Tree[K]) Insert(k K) { t.root = insert(t.root, k) }

func insert[K cmp.Ordered](n *treeNode[K], k K) *treeNode[K] {
	if n == nil {
		return &treeNode[K]{key: k}
	}
	switch {
	case k < n.key:
		n.left = insert(n.left, k)
	case k > n.key:
		n.right = insert(n.right, k)
	}
	return n
}

func (t *Tree[K]) Contains(k K) bool {
	for n := t.root; n != nil; {
		switch {
		case k == n.key:
			return true
		case k < n.key:
			n = n.left
		default:
			n = n.right
		}
	}
	return false
}

// All is an in-order iterator (Go 1.23 range-over-func): keys come out sorted.
func (t *Tree[K]) All(yield func(K) bool) {
	var walk func(*treeNode[K]) bool
	walk = func(n *treeNode[K]) bool {
		return n == nil || (walk(n.left) && yield(n.key) && walk(n.right))
	}
	walk(t.root)
}

func (t *Tree[K]) LevelOrder() []K {
	var out []K
	if t.root == nil {
		return out
	}
	queue := []*treeNode[K]{t.root}
	for len(queue) > 0 {
		n := queue[0]
		queue = queue[1:]
		out = append(out, n.key)
		if n.left != nil {
			queue = append(queue, n.left)
		}
		if n.right != nil {
			queue = append(queue, n.right)
		}
	}
	return out
}

func height[K cmp.Ordered](n *treeNode[K]) int {
	if n == nil {
		return 0
	}
	return 1 + max(height(n.left), height(n.right))
}

func bstDemo() {
	//         8
	//       /   \
	//      3     10
	//     / \      \
	//    1   6      14
	var t Tree[int]
	for _, k := range []int{8, 3, 10, 1, 6, 14} {
		t.Insert(k)
	}
	for k := range t.All {
		fmt.Print(k, " ")
	}
	fmt.Println()                             // 1 3 6 8 10 14
	fmt.Println(t.LevelOrder())               // [8 3 10 1 6 14]
	fmt.Println(t.Contains(6), t.Contains(7)) // true false
	fmt.Println(height(t.root))               // 3

	var words Tree[string]
	for _, w := range []string{"go", "rust", "c", "java"} {
		words.Insert(w)
	}
	for w := range words.All {
		fmt.Print(w, " ")
	}
	fmt.Println() // c go java rust
}
