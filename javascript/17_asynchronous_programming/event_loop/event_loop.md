# The event loop

JavaScript runs on **one thread**. The event loop lets it handle async work without blocking.

```
   ┌───────────────────────┐
   │      Call stack       │  <- your code runs here, one function at a time
   └──────────┬────────────┘
              │ when the stack is empty...
              ▼
   ┌───────────────────────┐
   │   Microtask queue     │  <- 1. run ALL of these first
   │ Promise.then/catch,   │
   │ await, queueMicrotask │
   └──────────┬────────────┘
              ▼
   ┌───────────────────────┐
   │ Macrotask (task) queue│  <- 2. then run ONE of these, then go back to step 1
   │ setTimeout, setInterval│
   │ I/O, UI events        │
   └───────────────────────┘
```

## Rules
1. Run all synchronous code until the call stack is empty.
2. Run **every** microtask (including new ones added while running them).
3. Run **one** macrotask.
4. (Browser) render the page if needed.
5. Repeat from 2.

So `Promise.resolve().then(fn)` always runs before `setTimeout(fn, 0)`.

## Node.js extras
- `process.nextTick(fn)` runs before other microtasks.
- `setImmediate(fn)` runs in the "check" phase, after I/O.

## Files
1. `1_call_stack.js` – synchronous code and the stack
2. `2_microtask_vs_macrotask.js` – the classic ordering puzzle
3. `3_queueMicrotask_and_nextTick.js` – Node-specific queues
4. `4_blocking_the_loop.js` – why long synchronous work freezes everything
