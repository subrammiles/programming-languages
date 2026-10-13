package main

import (
	"fmt"
	"math/rand/v2"
	"regexp"
)

/*
 regexp       RE2 syntax: guaranteed linear time (no catastrophic backtracking, no lookarounds)
 math/rand/v2 (Go 1.22) random numbers; crypto/rand for secrets
*/

var datePattern = regexp.MustCompile(`(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})`)

func regularExpressions() {
	text := "Order #123 shipped on 2026-10-13, order #456 pending"
	fmt.Println(regexp.MustCompile(`#\d+`).FindAllString(text, -1)) // [#123 #456]

	m := datePattern.FindStringSubmatch(text)
	fmt.Println(m[datePattern.SubexpIndex("day")], m[2]) // 13 10

	fmt.Println(datePattern.ReplaceAllString(text, "${day}/${month}/${year}")[22:32]) // 13/10/2026
	fmt.Println(regexp.MustCompile(`^[6-9]\d{9}$`).MatchString("9876543210"))         // true
}

func randomNumbers() {
	r := rand.New(rand.NewPCG(1, 2)) // seeded: the same sequence every run
	fmt.Println(r.IntN(100), r.IntN(100), r.Float64() < 1)
	fmt.Println(rand.N(10) < 10) // generic: works with any integer type
	items := []string{"a", "b", "c", "d"}
	r.Shuffle(len(items), func(i, j int) { items[i], items[j] = items[j], items[i] })
	fmt.Println(items)
}
