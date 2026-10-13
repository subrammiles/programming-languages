# What's new in Go

| Version | Released | Highlights | Learn it in |
|---|---|---|---|
| 1.18 | Mar 2022 | **generics**, fuzzing, workspaces (`go work`) | 14, 20 |
| 1.19 | Aug 2022 | `atomic.Int64` and friends, doc comment links | 16 |
| 1.20 | Feb 2023 | `errors.Join`, wrapping several errors, `context.WithCancelCause` | 13, 17 |
| 1.21 | Aug 2023 | `min` / `max` / `clear`, `slices`, `maps`, `cmp`, `log/slog`, `sync.OnceValue` | 06, 07, 19 |
| 1.22 | Feb 2024 | `range` over ints, per-iteration loop variables, `GET /items/{id}` routing, `math/rand/v2` | 04, 19 |
| 1.23 | Aug 2024 | **iterators** (`range` over functions), `iter`, `unique`, `slices.Collect` | 18 |
| 1.24 | Feb 2025 | generic type aliases, `b.Loop()`, `strings.Lines`, `os.Root`, `weak`, faster maps | 14, 20 |
| 1.25 | Aug 2025 | `WaitGroup.Go`, `testing/synctest`, container-aware `GOMAXPROCS` | 16, 20 |
| 1.26 | Feb 2026 | `new(expr)`, `errors.AsType`, self-referential generics, Green Tea GC | 09, 13 |
| 1.27 | Aug 2026 | **generic methods**, `encoding/json/v2`, `uuid` package, `strings.CutLast` | 14, 19, 08 |

`go run ./21_whats_new` shows a small example of each. Full notes: [go.dev/doc/devel/release](https://go.dev/doc/devel/release).
