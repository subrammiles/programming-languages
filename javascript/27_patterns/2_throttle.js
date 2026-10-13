/*
Throttle
Run at most once every `interval` ms, no matter how often it is called.
Use for: scroll handlers, mouse move, rate-limiting API calls.

Debounce vs throttle:
  debounce -> waits for a pause, then runs once
  throttle -> runs regularly during continuous activity
*/
function throttle(fn, interval) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}

const start = Date.now();
const onScroll = throttle(() => console.log(`handled scroll at ${Date.now() - start}ms`), 200);

// Simulate a scroll event every 20ms for 1 second (50 events)
const id = setInterval(onScroll, 20);
setTimeout(() => clearInterval(id), 1000);
// handled scroll at ~20ms
// handled scroll at ~220ms
// handled scroll at ~420ms
// ... only ~5 times instead of 50
