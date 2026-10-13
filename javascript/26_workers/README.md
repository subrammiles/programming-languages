# Workers

JavaScript is single-threaded: heavy CPU work blocks everything else
(see `17_asynchronous_programming/event_loop/4_blocking_the_loop.js`).
Workers run code on **another thread**, and talk to the main thread with messages.

| | Node.js | Browser |
|---|---|---|
| Module | `node:worker_threads` | `new Worker("file.js")` |
| Send | `worker.postMessage(data)` | `worker.postMessage(data)` |
| Receive | `worker.on("message", fn)` | `worker.onmessage = fn` |
| Folder | `worker_threads/` | `web_workers/` |

Workers do **not** share variables. Messages are copied (structured clone),
except `SharedArrayBuffer` and transferred `ArrayBuffer`s.

Use workers for CPU-heavy work: image processing, parsing big files, crypto, math.
Do **not** use them for I/O (network, files); async I/O is already non-blocking.

```bash
node worker_threads/1_main.js
npx serve web_workers     # then open the printed URL
```
