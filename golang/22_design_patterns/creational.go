package main

import (
	"errors"
	"fmt"
	"strings"
	"sync"
	"time"
)

/*
Creational patterns: functional options, singleton, builder, factory
*/

// ---- Functional options ----
// THE most common Go constructor pattern (grpc.Dial, zap, many HTTP clients).
// Problem: a constructor with many optional settings. Go has no default arguments or overloading.
// Solution: NewServer(addr, opts ...Option), where each Option is a function that changes the config.
// Adding a new option later never breaks existing callers.

type Server struct {
	addr     string
	timeout  time.Duration
	maxConns int
	tls      bool
}

type Option func(*Server)

func WithTimeout(d time.Duration) Option { return func(s *Server) { s.timeout = d } }
func WithMaxConns(n int) Option          { return func(s *Server) { s.maxConns = n } }
func WithTLS() Option                    { return func(s *Server) { s.tls = true } }

func NewServer(addr string, opts ...Option) *Server {
	s := &Server{addr: addr, timeout: 30 * time.Second, maxConns: 100} // defaults
	for _, opt := range opts {
		opt(s)
	}
	return s
}

func functionalOptions() {
	show := func(s *Server) {
		fmt.Printf("addr=%s timeout=%v maxConns=%d tls=%v\n", s.addr, s.timeout, s.maxConns, s.tls)
	}
	show(NewServer(":8080"))                                       // addr=:8080 timeout=30s maxConns=100 tls=false
	show(NewServer(":443", WithTLS(), WithTimeout(5*time.Second))) // addr=:443 timeout=5s maxConns=100 tls=true
}

// ---- Singleton ----
// sync.Once guarantees the initialisation runs exactly once, even from many goroutines.
// sync.OnceValue (Go 1.21) is shorter. Often, creating one value in main and passing it
// around (dependency injection) is better than a global.

type Database struct{ id int }

var (
	dbOnce     sync.Once
	dbInstance *Database
	created    int
)

func GetDatabase() *Database {
	dbOnce.Do(func() {
		created++
		dbInstance = &Database{id: 1}
	})
	return dbInstance
}

var getConfig = sync.OnceValue(func() map[string]string {
	return map[string]string{"env": "prod"}
})

func singleton() {
	var wg sync.WaitGroup
	for range 100 {
		wg.Go(func() { GetDatabase() })
	}
	wg.Wait()
	fmt.Println("created:", created, "same:", GetDatabase() == GetDatabase()) // created: 1 same: true
	fmt.Println(getConfig()["env"])                                           // prod
}

// ---- Builder ----
// Build a complex value step by step with chained methods. Errors are collected and
// returned by Build(), so the chain stays readable.

type Query struct{ sql string }

type QueryBuilder struct {
	table   string
	wheres  []string
	orderBy string
	limit   int
	err     error
}

func Select() *QueryBuilder { return &QueryBuilder{} }

func (b *QueryBuilder) From(table string) *QueryBuilder  { b.table = table; return b }
func (b *QueryBuilder) Where(cond string) *QueryBuilder  { b.wheres = append(b.wheres, cond); return b }
func (b *QueryBuilder) OrderBy(col string) *QueryBuilder { b.orderBy = col; return b }
func (b *QueryBuilder) Limit(n int) *QueryBuilder {
	if n <= 0 {
		b.err = errors.New("limit must be positive")
	}
	b.limit = n
	return b
}

func (b *QueryBuilder) Build() (Query, error) {
	if b.err != nil {
		return Query{}, b.err
	}
	if b.table == "" {
		return Query{}, errors.New("missing table")
	}
	var sb strings.Builder
	sb.WriteString("SELECT * FROM " + b.table)
	if len(b.wheres) > 0 {
		sb.WriteString(" WHERE " + strings.Join(b.wheres, " AND "))
	}
	if b.orderBy != "" {
		sb.WriteString(" ORDER BY " + b.orderBy)
	}
	if b.limit > 0 {
		fmt.Fprintf(&sb, " LIMIT %d", b.limit)
	}
	return Query{sb.String()}, nil
}

func builder() {
	q, err := Select().From("users").Where("age > 18").Where("active").OrderBy("name").Limit(10).Build()
	fmt.Println(q.sql, err) // SELECT * FROM users WHERE age > 18 AND active ORDER BY name LIMIT 10 <nil>

	_, err = Select().From("users").Limit(-1).Build()
	fmt.Println(err) // limit must be positive
}

// ---- Factory ----
// A function that returns an interface, choosing the concrete type from input.
// Callers depend only on the interface.

type Notifier interface{ Send(msg string) string }

type emailNotifier struct{ to string }
type smsNotifier struct{ phone string }

func (e emailNotifier) Send(msg string) string { return "email to " + e.to + ": " + msg }
func (s smsNotifier) Send(msg string) string   { return "sms to " + s.phone + ": " + msg }

func NewNotifier(kind, target string) (Notifier, error) {
	switch kind {
	case "email":
		return emailNotifier{to: target}, nil
	case "sms":
		return smsNotifier{phone: target}, nil
	default:
		return nil, fmt.Errorf("unknown notifier %q", kind)
	}
}

func factory() {
	for _, kind := range []string{"email", "sms", "pigeon"} {
		n, err := NewNotifier(kind, "ann")
		if err != nil {
			fmt.Println("error:", err)
			continue
		}
		fmt.Println(n.Send("order shipped"))
	}
	// email to ann: order shipped
	// sms to ann: order shipped
	// error: unknown notifier "pigeon"
}
