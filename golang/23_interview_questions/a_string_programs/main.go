// String programs asked in Go interviews.
//
//	go run ./23_interview_questions/a_string_programs
//
// Remember: a Go string is a read-only slice of BYTES (UTF-8).
// Index or range over []rune when the text may contain non-ASCII characters.
package main

import (
	"fmt"
	"maps"
	"slices"
	"strings"
	"unicode"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

// Reverse works on runes, so "héllo" and emoji reverse correctly.
func Reverse(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}

func IsPalindrome(s string) bool {
	var clean []rune
	for _, r := range strings.ToLower(s) {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			clean = append(clean, r)
		}
	}
	for i, j := 0, len(clean)-1; i < j; i, j = i+1, j-1 {
		if clean[i] != clean[j] {
			return false
		}
	}
	return true
}

func IsAnagram(a, b string) bool {
	if len(a) != len(b) {
		return false
	}
	counts := map[rune]int{}
	for _, r := range a {
		counts[r]++
	}
	for _, r := range b {
		counts[r]--
		if counts[r] < 0 {
			return false
		}
	}
	return true
}

func CharFrequency(s string) map[rune]int {
	freq := map[rune]int{}
	for _, r := range s {
		freq[r]++
	}
	return freq
}

func FirstUnique(s string) (rune, bool) {
	freq := CharFrequency(s)
	for _, r := range s { // iterate the string, not the map: map order is random
		if freq[r] == 1 {
			return r, true
		}
	}
	return 0, false
}

func CountVowels(s string) int {
	n := 0
	for _, r := range strings.ToLower(s) {
		if strings.ContainsRune("aeiou", r) {
			n++
		}
	}
	return n
}

func ReverseWords(s string) string {
	words := strings.Fields(s) // splits on any run of whitespace
	slices.Reverse(words)
	return strings.Join(words, " ")
}

func IsRotation(a, b string) bool {
	return len(a) == len(b) && strings.Contains(a+a, b)
}

func RemoveDuplicates(s string) string {
	seen := map[rune]bool{}
	var sb strings.Builder
	for _, r := range s {
		if !seen[r] {
			seen[r] = true
			sb.WriteRune(r)
		}
	}
	return sb.String()
}

func Compress(s string) string {
	var sb strings.Builder
	r := []rune(s)
	for i := 0; i < len(r); {
		j := i
		for j < len(r) && r[j] == r[i] {
			j++
		}
		fmt.Fprintf(&sb, "%c%d", r[i], j-i)
		i = j
	}
	if sb.Len() >= len(s) {
		return s
	}
	return sb.String()
}

// LongestUniqueSubstring uses a sliding window: O(n).
func LongestUniqueSubstring(s string) string {
	last := map[byte]int{}
	start, bestStart, bestLen := 0, 0, 0
	for end := 0; end < len(s); end++ {
		if i, ok := last[s[end]]; ok && i >= start {
			start = i + 1
		}
		last[s[end]] = end
		if end-start+1 > bestLen {
			bestStart, bestLen = start, end-start+1
		}
	}
	return s[bestStart : bestStart+bestLen]
}

func IsBalanced(s string) bool {
	pairs := map[rune]rune{')': '(', ']': '[', '}': '{'}
	var stack []rune
	for _, r := range s {
		switch r {
		case '(', '[', '{':
			stack = append(stack, r)
		case ')', ']', '}':
			if len(stack) == 0 || stack[len(stack)-1] != pairs[r] {
				return false
			}
			stack = stack[:len(stack)-1]
		}
	}
	return len(stack) == 0
}

func Permutations(s string) []string {
	if len(s) <= 1 {
		return []string{s}
	}
	var out []string
	for i := range len(s) {
		rest := s[:i] + s[i+1:]
		for _, p := range Permutations(rest) {
			out = append(out, string(s[i])+p)
		}
	}
	return out
}

func GroupAnagrams(words []string) [][]string {
	groups := map[string][]string{}
	var order []string
	for _, w := range words {
		r := []rune(w)
		slices.Sort(r)
		key := string(r)
		if _, ok := groups[key]; !ok {
			order = append(order, key)
		}
		groups[key] = append(groups[key], w)
	}
	out := make([][]string, 0, len(order))
	for _, k := range order {
		out = append(out, groups[k])
	}
	return out
}

func WordCount(text string) map[string]int {
	counts := map[string]int{}
	for _, w := range strings.FieldsFunc(strings.ToLower(text), func(r rune) bool {
		return !unicode.IsLetter(r)
	}) {
		counts[w]++
	}
	return counts
}

func run() {
	fmt.Println(Reverse("Hello, 世界"))                                               // 界世 ,olleH
	fmt.Println(IsPalindrome("A man, a plan, a canal: Panama"), IsPalindrome("Go")) // true false
	fmt.Println(IsAnagram("listen", "silent"), IsAnagram("rat", "car"))             // true false

	freq := CharFrequency("banana")
	for _, r := range slices.Sorted(maps.Keys(freq)) {
		fmt.Printf("%c=%d ", r, freq[r])
	}
	fmt.Println() // a=3 b=1 n=2

	r, ok := FirstUnique("swiss")
	fmt.Printf("%c %v\n", r, ok)                                                      // w true
	fmt.Println(CountVowels("Interview Questions"))                                   // 8
	fmt.Println(ReverseWords("  Go   is fun "))                                       // fun is Go
	fmt.Println(IsRotation("waterbottle", "erbottlewat"))                             // true
	fmt.Println(RemoveDuplicates("programming"))                                      // progamin
	fmt.Println(Compress("aaabbcdddd"), Compress("abc"))                              // a3b2c1d4 abc
	fmt.Println(LongestUniqueSubstring("abcabcbb"), LongestUniqueSubstring("pwwkew")) // abc wke
	fmt.Println(IsBalanced("{[()]}"), IsBalanced("([)]"))                             // true false
	fmt.Println(Permutations("abc"))                                                  // [abc acb bac bca cab cba]
	fmt.Println(GroupAnagrams([]string{"eat", "tea", "tan", "ate", "nat", "bat"}))    // [[eat tea ate] [tan nat] [bat]]

	counts := WordCount("The cat and the hat. THE end!")
	fmt.Println(counts["the"], counts["cat"], len(counts)) // 3 1 5

	// Bytes vs runes: a classic follow-up question
	s := "héllo"
	fmt.Println(len(s), len([]rune(s)), s[1], string([]rune(s)[1])) // 6 5 195 é
}

func main() {
	examples.Run([]examples.Example{{Name: "string programs", Run: run}})
}
