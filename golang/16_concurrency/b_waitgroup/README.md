# WaitGroup

To wait for several goroutines to finish, use a `sync.WaitGroup`.
Since Go 1.25, `wg.Go(func(){...})` is the simplest way.
If a WaitGroup is passed into a function, pass it **by pointer**.

Run: `go run ./16_concurrency/b_waitgroup`
