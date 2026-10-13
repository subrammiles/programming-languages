# Packages and modules

| Term | Meaning |
|---|---|
| **package** | a folder of `.go` files with the same `package` line; the unit of code reuse |
| **module** | a collection of packages released together, defined by `go.mod` |
| **exported** | a name starting with a Capital letter, usable from other packages |
| **`internal/`** | packages only importable from inside the parent folder |
| **`main` package** | builds an executable; needs `func main()` |

## This chapter
```
15_packages_and_modules/
├── main.go                 <- package main, imports the two below
├── geometry/               <- a library package split across 2 files
│   ├── shapes.go
│   └── rectangle.go
└── internal/secret/        <- only importable from inside 15_packages_and_modules
```
Run: `go run ./15_packages_and_modules`

## Working with modules
```bash
go mod init github.com/you/project   # create go.mod
go get github.com/google/uuid@latest  # add a dependency (recorded in go.mod and go.sum)
go mod tidy                           # add missing / remove unused dependencies
go list -m all                        # list every dependency
go work init ./app ./lib              # workspaces: develop several modules together
```
Dependencies are downloaded from the Go module proxy and verified against `go.sum`.
Browse packages at [pkg.go.dev](https://pkg.go.dev).

## Documentation comments
A comment directly above an exported name documents it. `go doc ./15_packages_and_modules/geometry`
prints the documentation for the package.
