# Testing

Go's testing tools are built in: no framework to install.

```bash
go test ./20_testing                       # run the tests
go test ./20_testing -v                    # verbose: show each test
go test ./20_testing -run Slug             # only tests matching a regex
go test ./20_testing -cover                # coverage percentage
go test ./20_testing -bench=. -benchmem    # benchmarks
go test ./20_testing -fuzz=FuzzSlug -fuzztime=10s   # fuzzing
go test -race ./...                        # detect data races
```

| File | Shows |
|---|---|
| `cart.go` | the code under test (a library package, not `main`) |
| `cart_test.go` | tests, table-driven tests, subtests, `errors.Is`, `synctest` fake time (1.25), `b.Loop` benchmark (1.24), fuzzing |
| `example_test.go` | `Example` functions: tests that are also documentation |

Popular extras: `github.com/stretchr/testify` (assertions), `go.uber.org/mock` (mocks),
and `net/http/httptest` (see `19_standard_library`) for HTTP handlers.
