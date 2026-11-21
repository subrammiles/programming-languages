package main

import (
	"fmt"
	"strings"
)

// Node is a node of a singly linked list of any type.
type Node[T any] struct {
	Val  T
	Next *Node[T]
}

func FromSlice[T any](vals ...T) *Node[T] {
	dummy := &Node[T]{}
	tail := dummy
	for _, v := range vals {
		tail.Next = &Node[T]{Val: v}
		tail = tail.Next
	}
	return dummy.Next
}

func String[T any](head *Node[T]) string {
	var parts []string
	for n := head; n != nil; n = n.Next {
		parts = append(parts, fmt.Sprint(n.Val))
	}
	return "[" + strings.Join(parts, " -> ") + "]"
}

func Reverse[T any](head *Node[T]) *Node[T] {
	var prev *Node[T]
	for cur := head; cur != nil; {
		next := cur.Next
		cur.Next = prev
		prev, cur = cur, next
	}
	return prev
}

func Middle[T any](head *Node[T]) *Node[T] {
	slow, fast := head, head
	for fast != nil && fast.Next != nil {
		slow, fast = slow.Next, fast.Next.Next
	}
	return slow
}

// HasCycle is Floyd's tortoise and hare.
func HasCycle[T any](head *Node[T]) bool {
	slow, fast := head, head
	for fast != nil && fast.Next != nil {
		slow, fast = slow.Next, fast.Next.Next
		if slow == fast {
			return true
		}
	}
	return false
}

func NthFromEnd[T any](head *Node[T], n int) *Node[T] {
	lead, follow := head, head
	for range n {
		lead = lead.Next
	}
	for lead != nil {
		lead, follow = lead.Next, follow.Next
	}
	return follow
}

func MergeSorted(a, b *Node[int]) *Node[int] {
	dummy := &Node[int]{}
	tail := dummy
	for a != nil && b != nil {
		if a.Val <= b.Val {
			tail.Next, a = a, a.Next
		} else {
			tail.Next, b = b, b.Next
		}
		tail = tail.Next
	}
	if a != nil {
		tail.Next = a
	} else {
		tail.Next = b
	}
	return dummy.Next
}

func linkedListDemo() {
	fmt.Println(String(Reverse(FromSlice(1, 2, 3, 4, 5))))                   // [5 -> 4 -> 3 -> 2 -> 1]
	fmt.Println(Middle(FromSlice("a", "b", "c", "d", "e")).Val)              // c
	fmt.Println(NthFromEnd(FromSlice(10, 20, 30, 40, 50), 2).Val)            // 40
	fmt.Println(String(MergeSorted(FromSlice(1, 3, 5), FromSlice(2, 4, 6)))) // [1 -> 2 -> 3 -> 4 -> 5 -> 6]

	cyclic := FromSlice(1, 2, 3, 4)
	cyclic.Next.Next.Next.Next = cyclic.Next                 // 4 -> 2
	fmt.Println(HasCycle(cyclic), HasCycle(FromSlice(1, 2))) // true false
}
