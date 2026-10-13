/*
Blocking the event loop
While synchronous code runs, NOTHING else can happen:
timers, promises, clicks, and network responses all wait.
Keep synchronous work short, or split it up / move it to a worker (see 26_workers).
*/
const start = Date.now();
setTimeout(() => {
  console.log(`timer wanted 10ms, actually ran after ${Date.now() - start}ms`);
}, 10);

// Busy loop for ~1 second
while (Date.now() - start < 1000) {}
console.log("finished blocking work");
// timer wanted 10ms, actually ran after ~1000ms

// Fix: break the work into chunks and yield to the loop between them
function processInChunks(items, chunkSize, onDone) {
  let i = 0;
  function nextChunk() {
    const end = Math.min(i + chunkSize, items.length);
    for (; i < end; i++) { /* work on items[i] */ }
    if (i < items.length) setTimeout(nextChunk, 0);// let other tasks run
    else onDone();
  }
  nextChunk();
}
processInChunks(new Array(1_000_000).fill(0), 100_000, () => console.log("chunked work done"));
