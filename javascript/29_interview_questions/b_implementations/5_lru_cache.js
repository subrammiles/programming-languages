/*
LRU cache (Least Recently Used)
A fixed-size cache. When it is full, the entry used longest ago is thrown out.
Asked in both JS and DSA interviews; get and put must both be O(1).

The JS trick: a Map remembers INSERTION ORDER.
  - on get/put, delete the key and set it again -> it moves to the end ("most recent")
  - the first key in the Map is then always the least recently used one
(In other languages you would build a hash map + doubly linked list.)
*/

class LRUCache {
  #capacity;
  #map = new Map();

  constructor(capacity) {
    this.#capacity = capacity;
  }

  get(key) {
    if (!this.#map.has(key)) return -1;
    const value = this.#map.get(key);
    this.#map.delete(key);// move to the end = mark as most recently used
    this.#map.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.#map.has(key)) this.#map.delete(key);
    this.#map.set(key, value);
    if (this.#map.size > this.#capacity) {
      const oldest = this.#map.keys().next().value;// first key = least recently used
      this.#map.delete(oldest);
    }
  }

  keys() {
    return [...this.#map.keys()];// oldest -> newest
  }
}

const cache = new LRUCache(3);
cache.put("a", 1);
cache.put("b", 2);
cache.put("c", 3);
console.log(cache.keys());// [ 'a', 'b', 'c' ]

console.log(cache.get("a"));// 1   ('a' is now the most recent)
console.log(cache.keys());// [ 'b', 'c', 'a' ]

cache.put("d", 4);// full: 'b' is the least recently used, so it is evicted
console.log(cache.keys());// [ 'c', 'a', 'd' ]
console.log(cache.get("b"));// -1

cache.put("c", 30);// updating also counts as a use
console.log(cache.keys());// [ 'a', 'd', 'c' ]
console.log(cache.get("c"));// 30
