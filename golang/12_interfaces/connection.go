package main

type Connection interface {
	Open(uri string) (string, string)
	Close() error
}
