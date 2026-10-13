// A tour of the standard library.
//
//	go run ./19_standard_library
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "runtime", Run: runtimeInfo},
		{Name: "time", Run: timeBasics},
		{Name: "files", Run: files},
		{Name: "JSON", Run: jsonEncodeDecode},
		{Name: "JSON v2 (Go 1.27)", Run: jsonV2},
		{Name: "HTTP server and client", Run: httpServerAndClient},
		{Name: "logging and slog", Run: logging},
		{Name: "regular expressions", Run: regularExpressions},
		{Name: "random numbers", Run: randomNumbers},
		{Name: "embed", Run: embedFiles},
		{Name: "running commands", Run: runCommands},
	})
}
