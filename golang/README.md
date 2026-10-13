# Go

Examples organised as chapters, in the order they are meant to be read.
They follow [A Tour of Go](https://go.dev/tour/) and [Effective Go](https://go.dev/doc/effective_go),
and add the modern features and tools used in Go projects today.

Written for **Go 1.27** (see [00_getting_started](00_getting_started) to install).

## Running the examples

This folder is one Go **module** (`go.mod`), and every chapter folder is a runnable program:

```bash
cd golang
go run ./05_functions             # run every example in the chapter, in order
go run ./05_functions closures    # only examples whose name contains "closures"
go run ./05_functions list        # list the example names
go build ./... && go vet ./...    # compile and check everything
go test ./...                     # run the tests (chapter 20)
```

Each chapter has one `main.go` that lists its examples; the other files hold the examples,
one topic per file. (Go allows only one `func main` per folder, which is why each folder is one program.)

In VS Code with the Go extension, open any file and press F5 ("Launch Package").

## Chapters

| #  | Chapter | Topics |
|----|---------|--------|
| 00 | [Getting started](00_getting_started) | install, `go run` / `build` / `fmt` / `vet`, modules |
| 01 | [Variables and constants](01_variables_and_constants) | `var`, `:=`, zero values, `const`, `iota`, scope, shadowing |
| 02 | [Data types](02_data_types) | numbers, strings, runes, booleans, conversion, `strconv`, defined types and aliases |
| 03 | [Operators](03_operators) | arithmetic, comparison, logical, bitwise |
| 04 | [Control flow](04_control_flow) | `if`, `for` (every form), `range`, `switch`, type switch, labels |
| 05 | [Functions](05_functions) | multiple returns, variadic, closures, `defer`, function types, recursion, `init` |
| 06 | [Arrays and slices](06_arrays_and_slices) | arrays, slices, `append`, `len` / `cap`, sharing, the `slices` package |
| 07 | [Maps](07_maps) | maps, comma-ok, `delete` / `clear`, the `maps` package, sets |
| 08 | [Strings](08_strings) | the `strings` package, bytes vs runes, UTF-8, `strings.Builder`, `fmt` verbs |
| 09 | [Pointers](09_pointers) | `&`, `*`, `new`, nil, pointers to structs |
| 10 | [Structs](10_structs) | structs, anonymous structs, embedding, tags |
| 11 | [Methods](11_methods) | receivers, value vs pointer receivers, methods on any type |
| 12 | [Interfaces](12_interfaces) | implicit interfaces, `any`, type assertions, `Stringer`, `io.Reader` / `Writer`, the nil gotcha |
| 13 | [Errors](13_errors) | error values, wrapping, `errors.Is` / `As` / `AsType`, custom errors, `panic` / `recover` |
| 14 | [Generics](14_generics) | type parameters, constraints, generic types, generic methods (1.27) |
| 15 | [Packages and modules](15_packages_and_modules) | packages, exported names, `internal/`, `go.mod` |
| 16 | [Concurrency](16_concurrency) | goroutines, WaitGroups, channels, `select`, worker pools, mutexes, pipelines |
| 17 | [Context](17_context) | cancellation, timeouts, request values |
| 18 | [Iterators](18_iterators) | range over functions, `iter.Seq`, composing iterators |
| 19 | [Standard library](19_standard_library) | `time`, files, JSON (and json/v2), `net/http`, `slog`, `regexp`, `embed`, `os/exec` |
| 20 | [Testing](20_testing) | table tests, subtests, benchmarks, fuzzing, examples, `synctest` |
| 21 | [What's new](21_whats_new) | Go 1.18 → 1.27, version by version |
