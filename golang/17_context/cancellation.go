package main

import (
	"context"
	"errors"
	"fmt"
	"time"
)

/*
context.Context carries a deadline, a cancellation signal and request-scoped values
across function calls and goroutines.
 - pass it as the FIRST parameter, named ctx:  func Fetch(ctx context.Context, url string)
 - context.Background() is the root; derive children with WithCancel, WithTimeout ...
 - always call the cancel function (defer cancel()) to free resources
 - check <-ctx.Done() / ctx.Err() in long-running work
*/

func worker(ctx context.Context, name string) error {
	for i := 1; ; i++ {
		select {
		case <-ctx.Done():
			fmt.Println(name, "stopping:", ctx.Err())
			return ctx.Err()
		case <-time.After(50 * time.Millisecond):
			fmt.Println(name, "step", i)
		}
	}
}

func withCancel() {
	ctx, cancel := context.WithCancel(context.Background())
	done := make(chan struct{})
	go func() {
		worker(ctx, "worker")
		close(done)
	}()
	time.Sleep(130 * time.Millisecond)
	cancel() // tell the worker to stop
	<-done
}

func withTimeout() {
	ctx, cancel := context.WithTimeout(context.Background(), 120*time.Millisecond)
	defer cancel()
	err := worker(ctx, "timed worker")
	fmt.Println(errors.Is(err, context.DeadlineExceeded)) // true
}

func slowQuery(ctx context.Context) (string, error) {
	select {
	case <-time.After(300 * time.Millisecond):
		return "rows", nil
	case <-ctx.Done():
		return "", fmt.Errorf("query cancelled: %w", ctx.Err())
	}
}

func timeoutAFunctionCall() {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()
	_, err := slowQuery(ctx)
	fmt.Println(err) // query cancelled: context deadline exceeded

	deadline, ok := ctx.Deadline()
	fmt.Println(ok, !deadline.IsZero()) // true true
}
