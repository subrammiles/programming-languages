# Interview questions

The programs Go interviews ask you to **write** or **predict**. The earlier chapters explain
the concepts; this chapter practises them. Each folder is its own program:

```bash
go run ./23_interview_questions/a_string_programs
go run -race ./23_interview_questions/f_concurrency_programs
go run ./23_interview_questions/e_data_structures lru     # only the LRU cache example
```
Every printed line is followed by a `//` comment with the expected output.

| Folder | Programs |
|---|---|
| [a_string_programs](a_string_programs) | reverse (rune-safe), palindrome, anagram, frequency, first unique char, vowels, reverse words, rotation, dedupe, compression, longest substring without repeats, balanced brackets, permutations, group anagrams, word count |
| [b_number_programs](b_number_programs) | FizzBuzz, primes and sieve, Fibonacci (loop and memoised), factorial and overflow, `math/big`, reverse number, Armstrong, GCD / LCM, digits, power of two |
| [c_array_programs](c_array_programs) | second largest, duplicates, missing number, two sum, dedupe in place, rotate, move zeros, merge sorted, Kadane, stock profit, chunk, intersection, sliding window |
| [d_searching_and_sorting](d_searching_and_sorting) | generic binary search; bubble, selection, insertion, merge, quick sort; parallel merge sort |
| [e_data_structures](e_data_structures) | generic linked list (reverse, middle, cycle, n-th from end, merge), stack, queue, BST with an iterator, LRU cache, graph BFS / DFS |
| [f_concurrency_programs](f_concurrency_programs) | odd / even goroutines, ping-pong, parallel sum, fixing a data race, bounded fetch with timeout, generator, ordered goroutines, `select` timeout |
| [g_predict_the_output](g_predict_the_output) | `defer` order and arguments, named results, `append` aliasing, range copies, loop variables, nil interface, shadowing, maps, strings as bytes, copy semantics, `recover`, `fallthrough` |

## Concept questions and where they are answered

| Question | Where |
|---|---|
| Value vs pointer receivers? Which types satisfy an interface? | [11_methods](../11_methods) |
| Slices vs arrays, `len` vs `cap`, how `append` grows | [06_arrays_and_slices/slice_internals.go](../06_arrays_and_slices/slice_internals.go) |
| Why is my non-nil error `!= nil`? | [12_interfaces/nil_interface_gotcha.go](../12_interfaces/nil_interface_gotcha.go) |
| Errors vs panics, wrapping, `errors.Is` / `As` | [13_errors](../13_errors) |
| Buffered vs unbuffered channels, deadlocks, goroutine leaks | [16_concurrency](../16_concurrency) |
| Mutex vs channel? `sync.WaitGroup`, `sync.Once`, atomics | [16_concurrency/h_mutex_and_atomic](../16_concurrency/h_mutex_and_atomic), [k_sync_primitives](../16_concurrency/k_sync_primitives) |
| How does `context` cancellation work? | [17_context](../17_context) |
| When should you use generics? | [14_generics/when_to_use_generics.go](../14_generics/when_to_use_generics.go) |
| How do you mock dependencies in Go? | [22_design_patterns](../22_design_patterns) (dependency injection) |
| How do you write table-driven tests, benchmarks, fuzz tests? | [20_testing](../20_testing) |
| How do you shut a server down cleanly? | [16_concurrency/m_graceful_shutdown](../16_concurrency/m_graceful_shutdown) |
