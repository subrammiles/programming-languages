# Channels

1. Channels let goroutines **communicate**: one sends a value, another receives it.
2. "Don't communicate by sharing memory; share memory by communicating." – Go proverb

```go
ch := make(chan int)  // a channel of ints
ch <- 5               // send
v := <-ch             // receive
close(ch)             // no more values
for v := range ch {}  // receive until closed
```

Run: `go run ./16_concurrency/c_channels`
