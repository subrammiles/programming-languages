/*
The iterator protocol
An ITERATOR is any object with a next() method that returns { value, done }.
An ITERABLE is any object with a [Symbol.iterator]() method that returns an iterator.

for...of, spread [...x], Array.from, destructuring, Map, Set, Promise.all
all work with any iterable.
Built-in iterables: Array, String, Map, Set, arguments, NodeList, generators.
Plain objects {} are NOT iterable.
*/
console.log("<<<<Test1 - calling next() by hand>>>>>")
const arr = ["a", "b"];
const it = arr[Symbol.iterator]();
console.log(it.next());// { value: 'a', done: false }
console.log(it.next());// { value: 'b', done: false }
console.log(it.next());// { value: undefined, done: true }

console.log("<<<<Test2 - what for...of does internally>>>>>")
const iterator = "hi"[Symbol.iterator]();
let result = iterator.next();
while (!result.done) {
  console.log(result.value);// h, then i
  result = iterator.next();
}

console.log("<<<<Test3 - plain objects are not iterable>>>>>")
try {
  for (const x of { a: 1 }) console.log(x);
} catch (e) {
  console.log(e.message);// {(intermediate value)} is not iterable
}
// Use Object.keys / values / entries to loop over an object instead
