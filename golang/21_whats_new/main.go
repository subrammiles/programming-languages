// What's new in Go, version by version (1.18 → 1.27).
//
//	go run ./21_whats_new
//	go run ./21_whats_new 1.27     <- just one version
//
// Go releases twice a year (February and August) and keeps strong backwards compatibility:
// code written for Go 1.0 still compiles today.
package main

import (
	"cmp"
	"errors"
	"fmt"
	"io/fs"
	"iter"
	"maps"
	"slices"
	"strings"
	"sync"
	"unique"
	"uuid"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

func go118() {
	// Generics, fuzzing, workspaces
	fmt.Println(Max(3, 9), Max("a", "b")) // 9 b
}

func Max[T cmp.Ordered](a, b T) T { return max(a, b) }

func go121() {
	// built-ins min, max, clear; packages slices, maps, cmp, log/slog
	fmt.Println(min(3, 1, 2), max(2.5, 1.0)) // 1 2.5
	m := map[string]int{"a": 1}
	clear(m)
	fmt.Println(len(m), slices.Contains([]int{1, 2}, 2)) // 0 true
	loadOnce := sync.OnceValue(func() int { return 42 })
	fmt.Println(loadOnce())
}

func go122() {
	// range over integers, per-iteration loop variables, http routing patterns, math/rand/v2
	for i := range 3 {
		fmt.Print(i, " ") // 0 1 2
	}
	fmt.Println()
}

func go123() {
	// range over functions (iterators), iter, unique, slices/maps iterator helpers
	var countdown iter.Seq[int] = func(yield func(int) bool) {
		for i := 3; i > 0 && yield(i); i-- {
		}
	}
	fmt.Println(slices.Collect(countdown))                                // [3 2 1]
	fmt.Println(slices.Sorted(maps.Keys(map[string]int{"b": 1, "a": 2}))) // [a b]
	fmt.Println(unique.Make("go") == unique.Make("go"))                   // true -> interned values compare by pointer
}

type Set[T comparable] = map[T]struct{} // generic type alias

func go124() {
	// generic type aliases, testing.B.Loop, strings.Lines/SplitSeq, os.Root, weak pointers, swiss-table maps
	s := Set[string]{"go": {}}
	fmt.Println(len(s))
	for part := range strings.SplitSeq("a,b", ",") {
		fmt.Print(part, " ")
	}
	fmt.Println()
}

func go125() {
	// sync.WaitGroup.Go, testing/synctest, container-aware GOMAXPROCS, experimental json/v2
	var wg sync.WaitGroup
	results := make([]int, 3)
	for i := range 3 {
		wg.Go(func() { results[i] = i * 10 })
	}
	wg.Wait()
	fmt.Println(results) // [0 10 20]
}

func go126() {
	// new(expr), errors.AsType, self-referential generic types, Green Tea GC by default
	p := new(42)
	fmt.Println(*p) // 42

	err := fmt.Errorf("load: %w", &fs.PathError{Op: "open", Path: "config.yaml", Err: fs.ErrNotExist})
	if pe, ok := errors.AsType[*fs.PathError](err); ok {
		fmt.Println(pe.Path) // config.yaml
	}
}

type Box[T any] struct{ v T }

// generic methods: a method with its OWN type parameter
func (b Box[T]) Convert[U any](f func(T) U) Box[U] { return Box[U]{f(b.v)} }

func go127() {
	// generic methods, encoding/json/v2, the uuid package, strings/bytes.CutLast
	b := Box[int]{21}.Convert(func(n int) string { return fmt.Sprint(n * 2) })
	fmt.Printf("%q\n", b.v) // "42"

	id := uuid.NewV7()                                          // time-ordered, good for database keys
	fmt.Println(len(id.String()), id.Compare(uuid.NewV7()) < 0) // 36 true

	dir, file, _ := strings.CutLast("/srv/app/main.go", "/")
	fmt.Println(dir, file) // /srv/app main.go
}

func main() {
	examples.Run([]examples.Example{
		{Name: "Go 1.18", Run: go118},
		{Name: "Go 1.21", Run: go121},
		{Name: "Go 1.22", Run: go122},
		{Name: "Go 1.23", Run: go123},
		{Name: "Go 1.24", Run: go124},
		{Name: "Go 1.25", Run: go125},
		{Name: "Go 1.26", Run: go126},
		{Name: "Go 1.27", Run: go127},
	})
}
