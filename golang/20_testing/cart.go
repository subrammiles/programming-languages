// Package cart is the code under test in chapter 20.
//
// Tests live next to the code in files ending in _test.go.
// Run them with:  go test ./20_testing -v
package cart

import (
	"errors"
	"fmt"
	"strings"
	"time"
)

// ErrInvalidQuantity is returned when a quantity is not positive.
var ErrInvalidQuantity = errors.New("quantity must be positive")

// Cart holds items and their quantities.
type Cart struct {
	prices map[string]int // in paise
	qty    map[string]int
}

// New returns an empty cart.
func New() *Cart {
	return &Cart{prices: map[string]int{}, qty: map[string]int{}}
}

// Add puts qty units of an item into the cart.
func (c *Cart) Add(name string, price, qty int) error {
	if qty <= 0 {
		return fmt.Errorf("add %s: %w", name, ErrInvalidQuantity)
	}
	c.prices[name] = price
	c.qty[name] += qty
	return nil
}

// Total returns the sum of price × quantity, after the discount percentage.
func (c *Cart) Total(discountPercent int) int {
	sum := 0
	for name, q := range c.qty {
		sum += c.prices[name] * q
	}
	return sum * (100 - discountPercent) / 100
}

// Slug turns a product title into a URL-safe slug.
func Slug(title string) string {
	var b strings.Builder
	lastDash := true
	for _, r := range strings.ToLower(title) {
		switch {
		case r >= 'a' && r <= 'z', r >= '0' && r <= '9':
			b.WriteRune(r)
			lastDash = false
		case !lastDash:
			b.WriteByte('-')
			lastDash = true
		}
	}
	return strings.TrimSuffix(b.String(), "-")
}

// ExpiresAfter reports, after waiting d, that a reservation has expired.
func ExpiresAfter(d time.Duration) <-chan string {
	ch := make(chan string, 1)
	go func() {
		time.Sleep(d)
		ch <- "expired"
	}()
	return ch
}
