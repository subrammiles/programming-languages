/*
Promise.withResolvers() (ES2024)
Requires Node 22+.
Returns { promise, resolve, reject } so you can resolve the promise from OUTSIDE.
Replaces this common pattern:
  let resolve, reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
*/
const { promise, resolve } = Promise.withResolvers();

promise.then(value => console.log("resolved with:", value));

// Resolve it later, from somewhere else
setTimeout(() => resolve("hello"), 200);// resolved with: hello

// Real use: turning an event into a promise
const { EventEmitter } = require("events");
function waitForEvent(emitter, eventName) {
  const { promise, resolve } = Promise.withResolvers();
  emitter.once(eventName, resolve);
  return promise;
}
const door = new EventEmitter();
waitForEvent(door, "open").then(who => console.log(`${who} opened the door`));
setTimeout(() => door.emit("open", "Asha"), 300);// Asha opened the door
