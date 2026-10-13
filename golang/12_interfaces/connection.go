package main

import (
	"errors"
	"fmt"
)

/*
Interfaces let code depend on BEHAVIOUR, not on a concrete type,
so you can swap implementations (a real database vs a fake one in tests).
*/

type Connection interface {
	Open(uri string) (string, error)
	Close() error
}

type postgres struct{ open bool }

func (p *postgres) Open(uri string) (string, error) {
	p.open = true
	return "postgres session for " + uri, nil
}

func (p *postgres) Close() error {
	if !p.open {
		return errors.New("not open")
	}
	p.open = false
	return nil
}

type fakeConnection struct{ calls []string }

func (f *fakeConnection) Open(uri string) (string, error) {
	f.calls = append(f.calls, "open "+uri)
	return "fake session", nil
}

func (f *fakeConnection) Close() error {
	f.calls = append(f.calls, "close")
	return nil
}

func runQuery(conn Connection) {
	session, err := conn.Open("db://localhost/shop")
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	defer conn.Close()
	fmt.Println("using", session)
}

func swappingImplementations() {
	runQuery(&postgres{})
	fake := &fakeConnection{}
	runQuery(fake)
	fmt.Println(fake.calls) // [open db://localhost/shop close]
}
