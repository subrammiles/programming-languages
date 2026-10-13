package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strings"
)

/*
Small interfaces from the standard library you will use all the time:
 fmt.Stringer   String() string           -> how a value prints
 error          Error() string            -> chapter 13
 io.Reader      Read(p []byte) (n int, err error)
 io.Writer      Write(p []byte) (n int, err error)
 sort.Interface Len, Less, Swap
"The bigger the interface, the weaker the abstraction." - Go proverb
*/

type Temperature float64

func (t Temperature) String() string { return fmt.Sprintf("%.1f°C", float64(t)) }

func stringer() {
	fmt.Println(Temperature(21.456)) // 21.5°C -> fmt calls String() automatically
}

type upperWriter struct{ w io.Writer }

func (u upperWriter) Write(p []byte) (int, error) {
	return u.w.Write([]byte(strings.ToUpper(string(p))))
}

func readersAndWriters() {
	r := strings.NewReader("anything that has a Read method is a reader\n")
	io.Copy(upperWriter{os.Stdout}, r) // ANYTHING THAT HAS A READ METHOD IS A READER
	fmt.Fprintln(upperWriter{os.Stdout}, "fmt.Fprintln accepts any io.Writer")
}

type byLength []string

func (b byLength) Len() int           { return len(b) }
func (b byLength) Less(i, j int) bool { return len(b[i]) < len(b[j]) }
func (b byLength) Swap(i, j int)      { b[i], b[j] = b[j], b[i] }

func sortInterface() {
	words := []string{"banana", "kiwi", "apple"}
	sort.Sort(byLength(words))
	fmt.Println(words) // [kiwi apple banana]
}

type Reader interface{ Read() string }
type Writer interface{ Write(string) }

// ReadWriter embeds two interfaces: it needs both methods
type ReadWriter interface {
	Reader
	Writer
}

type buffer struct{ data []string }

func (b *buffer) Read() string {
	if len(b.data) == 0 {
		return ""
	}
	first := b.data[0]
	b.data = b.data[1:]
	return first
}
func (b *buffer) Write(s string) { b.data = append(b.data, s) }

func embeddingInterfaces() {
	var rw ReadWriter = &buffer{}
	rw.Write("hello")
	rw.Write("world")
	fmt.Println(rw.Read(), rw.Read()) // hello world
}
