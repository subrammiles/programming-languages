/*
Node.js has two extra scheduling functions:
  process.nextTick(fn) -> runs before promise microtasks
  setImmediate(fn)     -> runs after I/O, in the "check" phase
Order in Node: sync -> nextTick -> microtasks -> timers / setImmediate
*/
setImmediate(() => console.log("5. setImmediate"));
setTimeout(() => console.log("4. setTimeout 0"), 0);
Promise.resolve().then(() => console.log("3. promise.then"));
process.nextTick(() => console.log("2. process.nextTick"));
console.log("1. sync");

// 1. sync
// 2. process.nextTick
// 3. promise.then
// 4. setTimeout 0      <- order of these two can swap
// 5. setImmediate      <- when run from the main module

// Inside an I/O callback, setImmediate is ALWAYS before setTimeout:
require("fs").readFile(__filename, () => {
  setTimeout(() => console.log("inside I/O: setTimeout"), 0);
  setImmediate(() => console.log("inside I/O: setImmediate"));// always first
});
