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
		{Name: "command-line flags", Run: commandLineFlags},
		{Name: "reading input", Run: readingInput},
		{Name: "heap (priority queue)", Run: heaps},
		{Name: "linked list", Run: linkedList},
		{Name: "ring buffer", Run: ringBuffer},
		{Name: "sorting structs", Run: sortingStructs},
		{Name: "binary search", Run: searching},
		{Name: "sort package (older API)", Run: olderSortPackage},
		{Name: "reflection basics", Run: reflectionBasics},
		{Name: "reflection: a struct tag validator", Run: reflectionValidator},
		{Name: "reflection: setting values", Run: reflectionSetting},
		{Name: "overflow and floats", Run: overflowAndFloats},
		{Name: "math/big", Run: bigNumbers},
		{Name: "text/template", Run: textTemplates},
		{Name: "html/template escaping", Run: htmlTemplates},
		{Name: "CSV", Run: csvFiles},
	})
}
