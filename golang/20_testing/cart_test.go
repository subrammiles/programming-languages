package cart

import (
	"errors"
	"testing"
	"testing/synctest"
	"time"
)

// A test is a function named TestXxx(t *testing.T).
func TestAddAndTotal(t *testing.T) {
	c := New()
	if err := c.Add("pen", 1000, 3); err != nil {
		t.Fatalf("Add returned error: %v", err) // Fatal stops this test
	}
	c.Add("book", 25000, 1)

	if got, want := c.Total(0), 28000; got != want {
		t.Errorf("Total(0) = %d, want %d", got, want) // Error reports and continues
	}
}

// Table-driven tests: one test, many cases. The most common Go testing style.
func TestTotalWithDiscount(t *testing.T) {
	tests := []struct {
		name     string
		discount int
		want     int
	}{
		{"no discount", 0, 10000},
		{"ten percent", 10, 9000},
		{"half price", 50, 5000},
		{"free", 100, 0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) { // a subtest: go test -run 'TestTotalWithDiscount/half'
			c := New()
			c.Add("item", 10000, 1)
			if got := c.Total(tt.discount); got != tt.want {
				t.Errorf("Total(%d) = %d, want %d", tt.discount, got, tt.want)
			}
		})
	}
}

func TestAddRejectsBadQuantity(t *testing.T) {
	err := New().Add("pen", 1000, 0)
	if !errors.Is(err, ErrInvalidQuantity) {
		t.Fatalf("got %v, want ErrInvalidQuantity", err)
	}
}

func TestSlug(t *testing.T) {
	cases := map[string]string{
		"Hello World":          "hello-world",
		"  Go 1.27 is here!  ": "go-1-27-is-here",
		"already-a-slug":       "already-a-slug",
	}
	for in, want := range cases {
		if got := Slug(in); got != want {
			t.Errorf("Slug(%q) = %q, want %q", in, got, want)
		}
	}
}

// synctest (Go 1.25) runs code in a "bubble" with a fake clock:
// a 1-hour sleep finishes instantly, so time-based code is fast and reliable to test.
func TestExpiresAfterAnHour(t *testing.T) {
	synctest.Test(t, func(t *testing.T) {
		start := time.Now()
		msg := <-ExpiresAfter(time.Hour)
		if msg != "expired" || time.Since(start) != time.Hour {
			t.Fatalf("got %q after %v", msg, time.Since(start))
		}
	})
}

// A benchmark: go test ./20_testing -bench=. -benchmem
func BenchmarkSlug(b *testing.B) {
	for b.Loop() { // Go 1.24: simpler and more accurate than for i := 0; i < b.N; i++
		Slug("The Go Programming Language, 2nd Edition")
	}
}

// A fuzz test: go test ./20_testing -fuzz=FuzzSlug -fuzztime=10s
// Go generates random inputs and checks the properties always hold.
func FuzzSlug(f *testing.F) {
	f.Add("Hello World") // seed inputs
	f.Add("  --  ")
	f.Fuzz(func(t *testing.T, input string) {
		s := Slug(input)
		for _, r := range s {
			if !(r >= 'a' && r <= 'z' || r >= '0' && r <= '9' || r == '-') {
				t.Fatalf("Slug(%q) = %q contains %q", input, s, r)
			}
		}
		if len(s) > 0 && (s[0] == '-' || s[len(s)-1] == '-') {
			t.Fatalf("Slug(%q) = %q starts or ends with a dash", input, s)
		}
	})
}
