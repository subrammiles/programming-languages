package main

import (
	"bufio"
	"flag"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

/*
Command-line programs: arguments, flags, and reading input
  os.Args          -> []string: program name, then every argument
  flag package     -> parses -name=value / -v / --port 8080, with types, defaults and -h help
  bufio.Scanner    -> reads input line by line (or word by word) from os.Stdin or any io.Reader
  fmt.Sscan        -> parses space-separated values from a string

These examples parse a FAKE argument list and read from a strings.Reader, so they run
without typing anything. In a real program use flag.Parse() and os.Stdin.
For bigger CLIs, popular libraries are cobra and urfave/cli.
*/

func commandLineFlags() {
	fmt.Println("program name:", len(os.Args[0]) > 0) // program name: true

	// flag.NewFlagSet works like the global flag functions, but on our own argument list
	fs := flag.NewFlagSet("server", flag.ContinueOnError)
	port := fs.Int("port", 8080, "port to listen on")
	host := fs.String("host", "localhost", "address to bind")
	verbose := fs.Bool("v", false, "verbose logging")
	timeout := fs.Duration("timeout", 30*time.Second, "request timeout")
	var tags []string
	fs.Func("tag", "add a tag (repeatable)", func(s string) error { // custom flag type
		tags = append(tags, s)
		return nil
	})

	args := []string{"-port=9090", "-v", "--timeout", "5s", "-tag", "api", "-tag", "beta", "extra.txt", "more.txt"}
	if err := fs.Parse(args); err != nil {
		fmt.Println("error:", err)
		return
	}
	fmt.Println(*host, *port, *verbose, *timeout, tags) // localhost 9090 true 5s [api beta]
	fmt.Println("positional args:", fs.Args())          // positional args: [extra.txt more.txt]

	// Bad input gives a clear error (and prints usage to stderr)
	bad := flag.NewFlagSet("bad", flag.ContinueOnError)
	bad.SetOutput(new(strings.Builder)) // hide the usage text in this demo
	bad.Int("port", 0, "")
	fmt.Println(bad.Parse([]string{"-port=abc"})) // invalid value "abc" for flag -port: parse error
}

func readingInput() {
	// In a real program: scanner := bufio.NewScanner(os.Stdin)
	input := "Ann 30\nBo 25\n\nCy 41\n"
	scanner := bufio.NewScanner(strings.NewReader(input))

	total := 0
	for scanner.Scan() { // false at end of input or on error
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		var name string
		var age int
		if _, err := fmt.Sscan(line, &name, &age); err != nil { // parse "Ann 30"
			fmt.Println("bad line:", line)
			continue
		}
		fmt.Printf("%s is %d\n", name, age)
		total += age
	}
	if err := scanner.Err(); err != nil {
		fmt.Println("read error:", err)
	}
	fmt.Println("total age:", total)
	// Ann is 30
	// Bo is 25
	// Cy is 41
	// total age: 96

	// Word by word instead of line by line
	words := bufio.NewScanner(strings.NewReader("the quick  brown\nfox"))
	words.Split(bufio.ScanWords)
	count := 0
	for words.Scan() {
		count++
	}
	fmt.Println("words:", count) // words: 4

	// Reading one line with a prompt (bufio.Reader)
	reader := bufio.NewReader(strings.NewReader("42\n"))
	fmt.Print("Enter a number: ")
	text, _ := reader.ReadString('\n')
	n, err := strconv.Atoi(strings.TrimSpace(text))
	fmt.Println(n*2, err) // Enter a number: 84 <nil>
}
