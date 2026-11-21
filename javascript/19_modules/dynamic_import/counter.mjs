// A module with state, used by main.mjs to show LIVE BINDINGS:
// importers see the current value of `count`, not a copy taken at import time.
export let count = 0;

export function increment() {
  count++;
}

export default function describe() {
  return `count is ${count}`;
}
