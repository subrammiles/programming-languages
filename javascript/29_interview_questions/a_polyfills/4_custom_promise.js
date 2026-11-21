/*
Build your own Promise
A senior-level interview question. It shows you understand:
  - the 3 states: pending -> fulfilled | rejected, and a promise settles only ONCE
  - then() returns a NEW promise, which is what makes chaining work
  - callbacks always run asynchronously, as microtasks (queueMicrotask)
  - returning a promise (or any "thenable") from a callback is adopted (flattened)
  - an exception thrown inside a callback rejects the next promise
*/

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING;
  #value;
  #handlers = [];// callbacks registered while still pending

  constructor(executor) {
    const resolve = (value) => this.#resolve(value);
    const reject = (reason) => this.#settle(REJECTED, reason);
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  #resolve(value) {
    if (value === this) return this.#settle(REJECTED, new TypeError("Cannot resolve a promise with itself"));
    // Adopt the state of a thenable (a real Promise or anything with .then)
    if (value !== null && (typeof value === "object" || typeof value === "function")) {
      let then;
      try {
        then = value.then;
      } catch (err) {
        return this.#settle(REJECTED, err);
      }
      if (typeof then === "function") {
        let called = false;// a thenable may try to call both; only the first counts
        try {
          then.call(
            value,
            (v) => !called && ((called = true), this.#resolve(v)),
            (r) => !called && ((called = true), this.#settle(REJECTED, r)),
          );
        } catch (err) {
          if (!called) this.#settle(REJECTED, err);
        }
        return;
      }
    }
    this.#settle(FULFILLED, value);
  }

  #settle(state, value) {
    if (this.#state !== PENDING) return;// already settled: ignore
    this.#state = state;
    this.#value = value;
    this.#handlers.forEach((h) => this.#runHandler(h));
    this.#handlers = [];
  }

  #runHandler({ onFulfilled, onRejected, resolve, reject }) {
    queueMicrotask(() => {
      const callback = this.#state === FULFILLED ? onFulfilled : onRejected;
      if (typeof callback !== "function") {
        // No handler for this state: pass the value/reason down the chain
        return this.#state === FULFILLED ? resolve(this.#value) : reject(this.#value);
      }
      try {
        resolve(callback(this.#value));
      } catch (err) {
        reject(err);
      }
    });
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handler = { onFulfilled, onRejected, resolve, reject };
      if (this.#state === PENDING) this.#handlers.push(handler);
      else this.#runHandler(handler);
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (value) => MyPromise.resolve(onFinally()).then(() => value),
      (reason) =>
        MyPromise.resolve(onFinally()).then(() => {
          throw reason;
        }),
    );
  }

  static resolve(value) {
    return value instanceof MyPromise ? value : new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}

// The sections below are asynchronous, so their output is interleaved when you run the file:
// all the <<<< headings >>>> print first (synchronous code), then the microtasks, then the timers.
// The comment next to each line shows what that line prints.

console.log("<<<< basic resolve + chaining >>>>");
new MyPromise((resolve) => setTimeout(() => resolve(1), 10))
  .then((n) => n + 1)
  .then((n) => new MyPromise((resolve) => setTimeout(() => resolve(n * 10), 10)))// adopted
  .then((n) => console.log("chain result:", n));// chain result: 20

console.log("<<<< errors skip to the next catch >>>>");
MyPromise.resolve("start")
  .then(() => {
    throw new Error("oops");
  })
  .then(() => console.log("never runs"))
  .catch((e) => {
    console.log("caught:", e.message);// caught: oops
    return "recovered";
  })
  .finally(() => console.log("finally runs"))// finally runs
  .then((v) => console.log("after finally:", v));// after finally: recovered

console.log("<<<< settles only once >>>>");
new MyPromise((resolve, reject) => {
  resolve("first");
  resolve("second");
  reject(new Error("third"));
}).then((v) => console.log("only:", v));// only: first

console.log("<<<< callbacks are asynchronous (microtasks) >>>>");
MyPromise.resolve().then(() => console.log("then callback"));
console.log("sync code");
// Order printed for this section:
// sync code
// then callback

console.log("<<<< works with await, because it is a thenable >>>>");
(async () => {
  const value = await new MyPromise((resolve) => setTimeout(() => resolve("awaited!"), 30));
  console.log(value);// awaited!
})();
