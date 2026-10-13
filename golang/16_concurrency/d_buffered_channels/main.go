// Buffered vs unbuffered channels.
//
//	go run ./16_concurrency/d_buffered_channels
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "buffered basics", Run: bufferedBasics},
		{Name: "first in, first out", Run: bufferedFIFO},
		{Name: "buffered does not block", Run: bufferedDoesNotBlock},
		{Name: "unbuffered blocks", Run: unbufferedBlocks},
		{Name: "buffered values", Run: bufferedValues},
		{Name: "unbuffered values (goroutine leak)", Run: unbufferedValues},
	})
}
