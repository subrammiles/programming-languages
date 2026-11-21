// Number programs asked in Go interviews.
//
//	go run ./23_interview_questions/b_number_programs
package main

import (
	"fmt"
	"math"
	"math/big"
	"strconv"
	"strings"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

func FizzBuzz(n int) string {
	parts := make([]string, 0, n)
	for i := 1; i <= n; i++ {
		switch {
		case i%15 == 0:
			parts = append(parts, "FizzBuzz")
		case i%3 == 0:
			parts = append(parts, "Fizz")
		case i%5 == 0:
			parts = append(parts, "Buzz")
		default:
			parts = append(parts, strconv.Itoa(i))
		}
	}
	return strings.Join(parts, " ")
}

func IsPrime(n int) bool {
	if n < 2 {
		return false
	}
	for i := 2; i*i <= n; i++ {
		if n%i == 0 {
			return false
		}
	}
	return true
}

// PrimesUpTo is the Sieve of Eratosthenes: O(n log log n).
func PrimesUpTo(n int) []int {
	composite := make([]bool, n+1)
	var primes []int
	for i := 2; i <= n; i++ {
		if composite[i] {
			continue
		}
		primes = append(primes, i)
		for j := i * i; j <= n; j += i {
			composite[j] = true
		}
	}
	return primes
}

func Fibonacci(count int) []int {
	out := make([]int, 0, count)
	a, b := 0, 1
	for range count {
		out = append(out, a)
		a, b = b, a+b // parallel assignment: no temp variable needed
	}
	return out
}

// FibMemo shows memoisation with a closure over a map.
func FibMemo() func(int) int {
	memo := map[int]int{}
	var fib func(int) int
	fib = func(n int) int {
		if n < 2 {
			return n
		}
		if v, ok := memo[n]; ok {
			return v
		}
		memo[n] = fib(n-1) + fib(n-2)
		return memo[n]
	}
	return fib
}

func Factorial(n int) int {
	if n <= 1 {
		return 1
	}
	return n * Factorial(n-1)
}

func BigFactorial(n int64) *big.Int {
	return new(big.Int).MulRange(1, n)
}

func ReverseNumber(n int) int {
	rev := 0
	for ; n != 0; n /= 10 {
		rev = rev*10 + n%10
	}
	return rev
}

func IsArmstrong(n int) bool {
	digits := len(strconv.Itoa(n))
	sum := 0
	for t := n; t > 0; t /= 10 {
		sum += int(math.Pow(float64(t%10), float64(digits)))
	}
	return sum == n
}

func GCD(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}

func LCM(a, b int) int { return a / GCD(a, b) * b }

func SumDigits(n int) int {
	sum := 0
	for n = max(n, -n); n > 0; n /= 10 {
		sum += n % 10
	}
	return sum
}

func IsPowerOfTwo(n int) bool { return n > 0 && n&(n-1) == 0 }

func run() {
	fmt.Println(FizzBuzz(15))                                      // 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz
	fmt.Println(IsPrime(97), IsPrime(91), IsPrime(2))              // true false true
	fmt.Println(PrimesUpTo(30))                                    // [2 3 5 7 11 13 17 19 23 29]
	fmt.Println(Fibonacci(10))                                     // [0 1 1 2 3 5 8 13 21 34]
	fmt.Println(FibMemo()(90))                                     // 2880067194370816120
	fmt.Println(Factorial(20), Factorial(21))                      // 2432902008176640000 -4249290049419214848   (21! overflows int64)
	fmt.Println(BigFactorial(25))                                  // 15511210043330985984000000
	fmt.Println(ReverseNumber(12345), ReverseNumber(1221) == 1221) // 54321 true

	var armstrong []int
	for i := 1; i < 1000; i++ {
		if IsArmstrong(i) {
			armstrong = append(armstrong, i)
		}
	}
	fmt.Println(armstrong)                                            // [1 2 3 4 5 6 7 8 9 153 370 371 407]
	fmt.Println(GCD(48, 18), LCM(4, 6))                               // 6 12
	fmt.Println(SumDigits(9875), SumDigits(-42))                      // 29 6
	fmt.Println(IsPowerOfTwo(64), IsPowerOfTwo(48))                   // true false
	fmt.Println(strconv.FormatInt(10, 2), strconv.FormatInt(255, 16)) // 1010 ff

	// Swap without a temp variable: Go makes it trivial
	a, b := 5, 9
	a, b = b, a
	fmt.Println(a, b) // 9 5
}

func main() {
	examples.Run([]examples.Example{{Name: "number programs", Run: run}})
}
