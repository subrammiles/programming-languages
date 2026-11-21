/*
Design pattern: Observer
A "subject" keeps a list of "observers" and notifies all of them when its state changes.
Observers do not poll; they are told.
It is everywhere in JS: DOM events (addEventListener), Node's EventEmitter,
state libraries (Redux store.subscribe), reactive frameworks (Vue, Svelte, signals).

Observer vs pub/sub: in Observer, observers subscribe to the subject directly.
In pub/sub, publishers and subscribers only know a shared event channel
(see 29_interview_questions/b_implementations/4_event_emitter.js).
*/

console.log("<<<< a subject with subscribers >>>>");
class Store {
  #state;
  #observers = new Set();

  constructor(initialState) {
    this.#state = initialState;
  }
  getState() {
    return this.#state;
  }
  subscribe(observer) {
    this.#observers.add(observer);
    return () => this.#observers.delete(observer);// unsubscribe function
  }
  setState(update) {
    const prev = this.#state;
    this.#state = { ...prev, ...update };
    this.#observers.forEach((observer) => observer(this.#state, prev));
  }
}

const cart = new Store({ items: [], total: 0 });

const stopBadge = cart.subscribe((state) => console.log(`  badge: ${state.items.length} item(s)`));
cart.subscribe((state, prev) => {
  if (state.total !== prev.total) console.log(`  total changed: ${prev.total} -> ${state.total}`);
});

cart.setState({ items: ["book"], total: 12 });
//   badge: 1 item(s)
//   total changed: 0 -> 12
cart.setState({ items: ["book", "pen"], total: 14 });
//   badge: 2 item(s)
//   total changed: 12 -> 14

console.log("<<<< unsubscribe >>>>");
stopBadge();
cart.setState({ items: ["book", "pen", "lamp"], total: 44 });
//   total changed: 14 -> 44

console.log("<<<< built-in observer: EventTarget (works in Node and browsers) >>>>");
const thermostat = new EventTarget();
thermostat.addEventListener("change", (e) => console.log(`  temperature is now ${e.detail}°C`));
thermostat.dispatchEvent(new CustomEvent("change", { detail: 21 }));//   temperature is now 21°C
