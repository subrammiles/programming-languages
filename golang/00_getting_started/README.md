# Getting started

## Install
Download Go from [go.dev/dl](https://go.dev/dl/) (these examples use **Go 1.27**) and check:
```bash
go version
```

## The go command
| Command | What it does |
|---|---|
| `go run ./00_getting_started` | compile and run a package |
| `go build ./...` | compile everything (catches errors) |
| `go fmt ./...` | format code the standard way |
| `go vet ./...` | find suspicious code |
| `go test ./...` | run tests (chapter 20) |
| `go mod init example.com/hello` | start a new module (a project) |
| `go get github.com/some/pkg` | add a dependency |
| `go doc fmt.Println` | read documentation |

Try code without installing anything at the [Go Playground](https://go.dev/play/).

## Modules
A **module** is a project: a folder with a `go.mod` file naming the module and the Go version.
This whole `golang/` folder is one module; every chapter folder is a package inside it.
