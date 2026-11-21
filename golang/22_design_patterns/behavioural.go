package main

import (
	"fmt"
	"io"
	"maps"
	"net/http"
	"net/http/httptest"
	"slices"
	"strings"
	"sync"
	"time"
)

/*
Behavioural and structural patterns: strategy, observer, decorator (middleware),
dependency injection, adapter
*/

// ---- Strategy ----
// Interchangeable algorithms behind one signature. In Go: a function type.

type PricingStrategy func(amount float64) float64

func regularPrice(a float64) float64 { return a }
func salePrice(pct float64) PricingStrategy {
	return func(a float64) float64 { return a * (1 - pct/100) }
}

func checkout(amount float64, pricing PricingStrategy) float64 { return pricing(amount) }

func strategy() {
	strategies := map[string]PricingStrategy{
		"regular":   regularPrice,
		"sale 20%":  salePrice(20),
		"member $5": func(a float64) float64 { return max(0, a-5) },
	}
	for _, name := range slices.Sorted(maps.Keys(strategies)) { // map order is random, so sort the keys
		fmt.Printf("%-9s %.2f\n", name, checkout(50, strategies[name]))
	}
	// member $5 45.00
	// regular   50.00
	// sale 20%  40.00
}

// ---- Observer ----
// Subscribers register a callback (or a channel) and are notified of events.

type Event struct {
	Name string
	Data any
}

type EventBus struct {
	mu   sync.RWMutex
	subs map[string][]func(Event)
}

func NewEventBus() *EventBus { return &EventBus{subs: map[string][]func(Event){}} }

func (b *EventBus) Subscribe(name string, fn func(Event)) {
	b.mu.Lock()
	defer b.mu.Unlock()
	b.subs[name] = append(b.subs[name], fn)
}

func (b *EventBus) Publish(e Event) {
	b.mu.RLock()
	handlers := slices.Clone(b.subs[e.Name]) // copy, so handlers may subscribe without deadlock
	b.mu.RUnlock()
	for _, h := range handlers {
		h(e)
	}
}

func observer() {
	bus := NewEventBus()
	bus.Subscribe("order.paid", func(e Event) { fmt.Println("  email: receipt for order", e.Data) })
	bus.Subscribe("order.paid", func(e Event) { fmt.Println("  stock: reserve items for order", e.Data) })
	bus.Publish(Event{"order.paid", 1001})
	bus.Publish(Event{"order.cancelled", 1002}) // no subscribers: nothing happens
	//   email: receipt for order 1001
	//   stock: reserve items for order 1001
}

// ---- Decorator / middleware ----
// Wrap a function to add behaviour (logging, auth, timing) without changing it.
// http.Handler middleware is the most common example in Go.

func logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		fmt.Printf("  log: %s %s (%v)\n", r.Method, r.URL.Path, time.Since(start) < time.Second)
	})
}

func requireAPIKey(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("X-API-Key") != "secret" {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return // do not call next
		}
		next.ServeHTTP(w, r)
	})
}

func chain(h http.Handler, middlewares ...func(http.Handler) http.Handler) http.Handler {
	for _, m := range slices.Backward(middlewares) { // wrap in reverse so the first runs first
		h = m(h)
	}
	return h
}

func middleware() {
	hello := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, "hello!") })
	handler := chain(hello, logging, requireAPIKey)

	for _, key := range []string{"secret", "wrong"} {
		req := httptest.NewRequest("GET", "/hello", nil)
		req.Header.Set("X-API-Key", key)
		rec := httptest.NewRecorder()
		handler.ServeHTTP(rec, req)
		fmt.Println(rec.Code, strings.TrimSpace(rec.Body.String()))
	}
	//   log: GET /hello (true)
	// 200 hello!
	//   log: GET /hello (true)
	// 401 unauthorized
}

// ---- Dependency injection ----
// "Accept interfaces, return structs." The service depends on a small interface;
// production passes the real thing, tests pass a fake. No DI framework needed.

type UserStore interface {
	FindEmail(id int) (string, error)
}

type Mailer interface {
	Send(to, body string) error
}

type WelcomeService struct {
	users  UserStore
	mailer Mailer
}

func (s WelcomeService) Welcome(id int) error {
	email, err := s.users.FindEmail(id)
	if err != nil {
		return fmt.Errorf("welcome user %d: %w", id, err)
	}
	return s.mailer.Send(email, "Welcome aboard!")
}

// Fakes, as you would write them in a _test.go file
type fakeStore map[int]string

func (f fakeStore) FindEmail(id int) (string, error) {
	if e, ok := f[id]; ok {
		return e, nil
	}
	return "", fmt.Errorf("user not found")
}

type fakeMailer struct{ sent []string }

func (m *fakeMailer) Send(to, body string) error {
	m.sent = append(m.sent, to+": "+body)
	return nil
}

func dependencyInjection() {
	mailer := &fakeMailer{}
	svc := WelcomeService{users: fakeStore{1: "ann@example.com"}, mailer: mailer}

	fmt.Println(svc.Welcome(1)) // <nil>
	fmt.Println(svc.Welcome(2)) // welcome user 2: user not found
	fmt.Println(mailer.sent)    // [ann@example.com: Welcome aboard!]
}

// ---- Adapter ----
// Make an existing type fit an interface it was not written for.
// http.HandlerFunc is the classic: it adapts a plain function into an http.Handler.

type LegacyPrinter struct{}

func (LegacyPrinter) PrintText(s string) string { return "[legacy] " + s }

// writerAdapter makes LegacyPrinter usable as an io.Writer
type writerAdapter struct {
	p   LegacyPrinter
	out *strings.Builder
}

func (a writerAdapter) Write(b []byte) (int, error) {
	a.out.WriteString(a.p.PrintText(string(b)))
	return len(b), nil
}

func adapter() {
	var out strings.Builder
	var w io.Writer = writerAdapter{p: LegacyPrinter{}, out: &out}
	fmt.Fprintf(w, "total: %d", 42) // any io.Writer API now works with the legacy printer
	fmt.Println(out.String())       // [legacy] total: 42
}
