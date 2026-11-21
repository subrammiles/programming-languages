package main

import (
	"container/list"
	"fmt"
	"slices"
	"sync"
)

// ---- LRU cache ----
// map for O(1) lookup + container/list (doubly linked) for usage order.
// Front of the list = most recently used. A mutex makes it safe for concurrent use.

type LRU[K comparable, V any] struct {
	mu       sync.Mutex
	capacity int
	order    *list.List
	items    map[K]*list.Element
}

type entry[K comparable, V any] struct {
	key   K
	value V
}

func NewLRU[K comparable, V any](capacity int) *LRU[K, V] {
	return &LRU[K, V]{capacity: capacity, order: list.New(), items: map[K]*list.Element{}}
}

func (c *LRU[K, V]) Get(key K) (V, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()
	if el, ok := c.items[key]; ok {
		c.order.MoveToFront(el)
		return el.Value.(entry[K, V]).value, true
	}
	var zero V
	return zero, false
}

func (c *LRU[K, V]) Put(key K, value V) {
	c.mu.Lock()
	defer c.mu.Unlock()
	if el, ok := c.items[key]; ok {
		el.Value = entry[K, V]{key, value}
		c.order.MoveToFront(el)
		return
	}
	if c.order.Len() == c.capacity {
		oldest := c.order.Back()
		c.order.Remove(oldest)
		delete(c.items, oldest.Value.(entry[K, V]).key)
	}
	c.items[key] = c.order.PushFront(entry[K, V]{key, value})
}

func (c *LRU[K, V]) Keys() []K { // most -> least recently used
	c.mu.Lock()
	defer c.mu.Unlock()
	var keys []K
	for el := c.order.Front(); el != nil; el = el.Next() {
		keys = append(keys, el.Value.(entry[K, V]).key)
	}
	return keys
}

func lruDemo() {
	c := NewLRU[string, int](3)
	c.Put("a", 1)
	c.Put("b", 2)
	c.Put("c", 3)
	c.Get("a")            // a is now most recent
	c.Put("d", 4)         // evicts b
	fmt.Println(c.Keys()) // [d a c]
	_, ok := c.Get("b")
	fmt.Println(ok) // false
	c.Put("c", 30)
	v, _ := c.Get("c")
	fmt.Println(c.Keys(), v) // [c d a] 30
}

// ---- Graph: adjacency list, BFS and DFS ----

type Graph map[string][]string

func (g Graph) AddEdge(a, b string) { // undirected
	g[a] = append(g[a], b)
	g[b] = append(g[b], a)
}

// BFS visits nearest nodes first; it also finds the shortest path in an unweighted graph.
func (g Graph) ShortestPath(from, to string) []string {
	prev := map[string]string{from: ""}
	queue := []string{from}
	for len(queue) > 0 {
		n := queue[0]
		queue = queue[1:]
		if n == to {
			var path []string
			for at := to; at != ""; at = prev[at] {
				path = append(path, at)
			}
			slices.Reverse(path)
			return path
		}
		for _, next := range g[n] {
			if _, seen := prev[next]; !seen {
				prev[next] = n
				queue = append(queue, next)
			}
		}
	}
	return nil
}

// DFS goes as deep as possible first (recursion = an implicit stack).
func (g Graph) DFS(start string) []string {
	var order []string
	seen := map[string]bool{}
	var visit func(string)
	visit = func(n string) {
		if seen[n] {
			return
		}
		seen[n] = true
		order = append(order, n)
		for _, next := range g[n] {
			visit(next)
		}
	}
	visit(start)
	return order
}

func graphDemo() {
	// A - B - D - F
	// |   |
	// C - E
	g := Graph{}
	for _, e := range [][2]string{{"A", "B"}, {"A", "C"}, {"B", "D"}, {"B", "E"}, {"C", "E"}, {"D", "F"}} {
		g.AddEdge(e[0], e[1])
	}
	fmt.Println(g.ShortestPath("C", "F")) // [C A B D F]
	fmt.Println(g.DFS("A"))               // [A B D F E C]
}
