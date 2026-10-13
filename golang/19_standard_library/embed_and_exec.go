package main

import (
	_ "embed"
	"fmt"
	"os/exec"
	"strings"
)

/*
 //go:embed   bake files into the compiled binary (templates, config, static web files)
 os/exec     run other programs
*/

//go:embed testdata/greeting.txt
var greeting string

func embedFiles() {
	fmt.Print(greeting)
}

func runCommands() {
	out, err := exec.Command("go", "version").Output()
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	fmt.Println(strings.HasPrefix(string(out), "go version")) // true

	err = exec.Command("go", "no-such-command").Run()
	fmt.Println(err) // exit status 2
}
