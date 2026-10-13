// Strings, runes and formatting.
//
//	go run ./08_strings
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "accessing characters", Run: accessingCharacters},
		{Name: "strings are immutable", Run: stringsAreImmutable},
		{Name: "comparing", Run: comparingStrings},
		{Name: "searching", Run: searching},
		{Name: "transforming", Run: transforming},
		{Name: "splitting and joining", Run: splittingAndJoining},
		{Name: "escape sequences", Run: escapeSequences},
		{Name: "loop through a string", Run: loopThroughString},
		{Name: "bytes vs runes", Run: bytesVsRunes},
		{Name: "unicode checks", Run: unicodeChecks},
		{Name: "strings.Builder", Run: stringBuilder},
		{Name: "fmt verbs", Run: fmtVerbs},
	})
}
