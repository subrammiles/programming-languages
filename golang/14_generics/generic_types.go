package main

import "fmt"

/*
Generic types: structs (and other types) with type parameters.
	type Stack[T any] struct { items []T }
Methods use the type's parameter: func (s *Stack[T]) Push(v T)
Go 1.27 also allows methods with their OWN extra type parameters (see Map below).
*/

type Stack[T any] struct {
	items []T
}

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

type Pair[K comparable, V any] struct {
	Key   K
	Value V
}

func (p Pair[K, V]) String() string { return fmt.Sprintf("%v=%v", p.Key, p.Value) }

type Cache[K comparable, V any] struct {
	data map[K]V
}

func NewCache[K comparable, V any]() *Cache[K, V] {
	return &Cache[K, V]{data: make(map[K]V)}
}

func (c *Cache[K, V]) Set(k K, v V) { c.data[k] = v }

func (c *Cache[K, V]) Get(k K) (V, bool) {
	v, ok := c.data[k]
	return v, ok
}

type List[T any] struct{ items []T }

// A generic METHOD with its own type parameter U (Go 1.27)
func (l List[T]) Map[U any](f func(T) U) List[U] {
	out := List[U]{}
	for _, item := range l.items {
		out.items = append(out.items, f(item))
	}
	return out
}

func genericTypes() {
	s := &Stack[string]{}
	s.Push("a")
	s.Push("b")
	v, _ := s.Pop()
	fmt.Println(v, s.Len()) // b 1

	_, ok := (&Stack[int]{}).Pop()
	fmt.Println(ok) // false

	p := Pair[string, int]{"age", 30}
	fmt.Println(p) // age=30

	c := NewCache[int, string]()
	c.Set(1, "one")
	val, found := c.Get(1)
	fmt.Println(val, found) // one true

	words := List[string]{items: []string{"go", "rust", "zig"}}
	lengths := words.Map(func(w string) int { return len(w) })
	fmt.Println(lengths.items) // [2 4 3]
}
