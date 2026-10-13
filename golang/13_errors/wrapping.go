package main

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
)

/*
Wrapping errors adds context while keeping the original underneath.
 fmt.Errorf("...: %w", err)   wrap (%w, not %v)
 errors.Is(err, target)       is target anywhere in the chain?   (compare with sentinel values)
 errors.As(err, &target)      find an error of a given TYPE in the chain
 errors.AsType[T](err)        the same, generic and shorter (Go 1.26)
 errors.Unwrap(err)           one level down
*/

var ErrNotFound = errors.New("not found") // a "sentinel" error

func findUser(id int) error {
	if id != 1 {
		return fmt.Errorf("findUser(%d): %w", id, ErrNotFound)
	}
	return nil
}

func loadProfile(id int) error {
	if err := findUser(id); err != nil {
		return fmt.Errorf("loading profile: %w", err)
	}
	return nil
}

func wrappingErrors() {
	err := loadProfile(7)
	fmt.Println(err)                         // loading profile: findUser(7): not found
	fmt.Println(errors.Is(err, ErrNotFound)) // true -> found inside the chain
	fmt.Println(err == ErrNotFound)          // false -> == only checks the outer error
	fmt.Println(errors.Unwrap(err))          // findUser(7): not found
}

func errorsAsType() {
	_, err := os.Open("/does/not/exist.txt")
	wrapped := fmt.Errorf("reading config: %w", err)

	var pathErr *fs.PathError
	if errors.As(wrapped, &pathErr) {
		fmt.Println("operation:", pathErr.Op, "path:", pathErr.Path)
	}
	if pe, ok := errors.AsType[*fs.PathError](wrapped); ok { // Go 1.26
		fmt.Println("AsType found:", pe.Path)
	}
	fmt.Println(errors.Is(wrapped, fs.ErrNotExist)) // true
}
