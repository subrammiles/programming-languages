# Concurrency

Each sub-folder is its own program:

| Folder | Topic | Run |
|---|---|---|
| `a_goroutines` | `go f()`, main doesn't wait, sequential vs concurrent | `go run ./16_concurrency/a_goroutines` |
| `b_waitgroup` | `sync.WaitGroup`, `wg.Go` (1.25) | `go run ./16_concurrency/b_waitgroup` |
| `c_channels` | send, receive, close, range, directions | `go run ./16_concurrency/c_channels` |
| `d_buffered_channels` | buffered vs unbuffered, goroutine leaks | `go run ./16_concurrency/d_buffered_channels` |
| `e_deadlock` | a program that deadlocks **on purpose** | `go run ./16_concurrency/e_deadlock` |
| `f_select` | `select`, timeouts, non-blocking operations, tickers | `go run ./16_concurrency/f_select` |
| `g_worker_pool` | a fixed pool of workers | `go run ./16_concurrency/g_worker_pool` |
| `h_mutex_and_atomic` | data races, `Mutex`, `RWMutex`, `atomic`, `OnceValue` | `go run -race ./16_concurrency/h_mutex_and_atomic` |
| `i_pipelines` | pipelines, fan-out, fan-in | `go run ./16_concurrency/i_pipelines` |
| `j_concurrent_http` | parallel HTTP calls, waiting in handlers | `go run ./16_concurrency/j_concurrent_http` |

Cancellation and timeouts across goroutines are in **17_context**.
Always run concurrent code with `go test -race` / `go run -race` while developing.
