// Channels.
//
//	go run ./16_concurrency/c_channels
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "creating channels", Run: creatingChannels},
		{Name: "signal with a channel", Run: signalWithChannel},
		{Name: "done channel", Run: doneChannel},
		{Name: "squares and cubes", Run: squaresAndCubes},
		{Name: "send and receive", Run: sendAndReceive},
		{Name: "without a channel", Run: withoutChannel},
		{Name: "with a channel", Run: withChannel},
		{Name: "close and range", Run: closeAndRange},
	})
}
