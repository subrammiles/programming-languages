package main

import (
	"context"
	"errors"
	"fmt"
	"time"
)

/*
 context.WithValue           attach request-scoped data (request ID, user) - NOT optional parameters
 context.WithCancelCause     cancel with a reason; read it with context.Cause (Go 1.20)
 context.AfterFunc           run a function when the context is cancelled (Go 1.21)
 context.WithoutCancel       keep values but ignore the parent's cancellation (Go 1.21)
Use a private key type for values so packages can't clash.
*/

type ctxKey string

const requestIDKey ctxKey = "requestID"

func handle(ctx context.Context) {
	logLine(ctx, "handling request")
}

func logLine(ctx context.Context, msg string) {
	id, _ := ctx.Value(requestIDKey).(string)
	fmt.Printf("[req %s] %s\n", id, msg)
}

func contextValues() {
	ctx := context.WithValue(context.Background(), requestIDKey, "abc-123")
	handle(ctx) // [req abc-123] handling request
}

var errShutdown = errors.New("server shutting down")

func cancelCause() {
	ctx, cancel := context.WithCancelCause(context.Background())
	stop := context.AfterFunc(ctx, func() { fmt.Println("AfterFunc: cleaning up") })
	defer stop()

	cancel(errShutdown)
	time.Sleep(10 * time.Millisecond) // give AfterFunc's goroutine time to run
	fmt.Println(ctx.Err())            // context canceled
	fmt.Println(context.Cause(ctx))   // server shutting down

	detached := context.WithoutCancel(ctx)
	fmt.Println(detached.Err()) // <nil> -> e.g. for an audit log that must still be written
}
