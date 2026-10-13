package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

/*
Files
 os.WriteFile / os.ReadFile        whole file at once
 os.Create / os.Open + defer Close streaming
 bufio.Scanner                     read line by line
 bufio.Writer                      buffered writes (remember Flush)
 filepath.Join / WalkDir           build and walk paths portably
*/

func files() {
	dir, err := os.MkdirTemp("", "go-files-")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer os.RemoveAll(dir) // clean up at the end

	path := filepath.Join(dir, "notes.txt")
	if err := os.WriteFile(path, []byte("line 1\nline 2\n"), 0o644); err != nil {
		fmt.Println(err)
		return
	}

	f, err := os.OpenFile(path, os.O_APPEND|os.O_WRONLY, 0o644)
	if err != nil {
		fmt.Println(err)
		return
	}
	w := bufio.NewWriter(f)
	fmt.Fprintln(w, "line 3")
	w.Flush()
	f.Close()

	data, _ := os.ReadFile(path)
	fmt.Print(string(data))

	f, _ = os.Open(path)
	defer f.Close()
	scanner := bufio.NewScanner(f)
	count := 0
	for scanner.Scan() {
		if strings.HasSuffix(scanner.Text(), "2") {
			fmt.Println("found:", scanner.Text())
		}
		count++
	}
	fmt.Println("lines:", count) // 3

	info, _ := os.Stat(path)
	fmt.Println(info.Name(), info.Size(), "bytes") // notes.txt 21 bytes

	_, err = os.ReadFile(filepath.Join(dir, "missing.txt"))
	fmt.Println(os.IsNotExist(err)) // true

	os.MkdirAll(filepath.Join(dir, "a", "b"), 0o755)
	os.WriteFile(filepath.Join(dir, "a", "b", "deep.go"), nil, 0o644)
	filepath.WalkDir(dir, func(p string, d os.DirEntry, err error) error {
		rel, _ := filepath.Rel(dir, p)
		fmt.Println(" ", rel)
		return nil
	})
}
