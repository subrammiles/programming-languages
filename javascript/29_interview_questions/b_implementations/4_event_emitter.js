/*
Build your own EventEmitter (publish / subscribe)
Chapter 23 uses Node's built-in EventEmitter. Interviews ask you to write one:
  on(event, fn)        -> subscribe; return an unsubscribe function (nice touch)
  once(event, fn)      -> subscribe for one call only
  off(event, fn)       -> unsubscribe
  emit(event, ...args) -> call every listener, in the order they subscribed

Gotcha: a listener that removes itself (or another) during emit must not make
the loop skip listeners. Copying the list before looping avoids that.
*/

class MyEventEmitter {
  #listeners = new Map();// event name -> array of functions

  on(event, fn) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, []);
    this.#listeners.get(event).push(fn);
    return () => this.off(event, fn);
  }

  once(event, fn) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      fn.apply(this, args);
    };
    wrapper.original = fn;// so off(event, fn) can also remove a once-listener
    return this.on(event, wrapper);
  }

  off(event, fn) {
    const list = this.#listeners.get(event);
    if (!list) return;
    const index = list.findIndex((l) => l === fn || l.original === fn);
    if (index !== -1) list.splice(index, 1);
    if (list.length === 0) this.#listeners.delete(event);
  }

  emit(event, ...args) {
    const list = this.#listeners.get(event);
    if (!list) return false;
    [...list].forEach((fn) => fn.apply(this, args));// copy: safe if listeners unsubscribe
    return true;
  }

  listenerCount(event) {
    return this.#listeners.get(event)?.length ?? 0;
  }
}

const chat = new MyEventEmitter();

console.log("<<<< on + emit >>>>");
const unsubscribe = chat.on("message", (from, text) => console.log(`[A] ${from}: ${text}`));
chat.on("message", (from) => console.log(`[B] got a message from ${from}`));
chat.emit("message", "Alice", "hello");
// [A] Alice: hello
// [B] got a message from Alice

console.log("<<<< unsubscribe >>>>");
unsubscribe();
chat.emit("message", "Bob", "hi");// [B] got a message from Bob

console.log("<<<< once >>>>");
chat.once("connect", () => console.log("connected (runs once)"));
chat.emit("connect");// connected (runs once)
chat.emit("connect");// (nothing)
console.log(chat.listenerCount("connect"));// 0

console.log("<<<< emit with no listeners >>>>");
console.log(chat.emit("unknown"));// false
