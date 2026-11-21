/*
Generators: next(value), return(), throw(), and infinite sequences

A generator object has three methods:
  gen.next(value)  -> resume; `value` becomes the result of the paused `yield`
  gen.return(v)    -> finish early, as if `return v` happened at the paused yield
                      (finally blocks still run)
  gen.throw(err)   -> resume by throwing err at the paused yield
Generators are LAZY: values are computed only when asked for,
so a generator can describe an infinite sequence.
*/

console.log("<<<< sending values in with next(value) >>>>");
function* conversation() {
  const name = yield "What is your name?";
  const hobby = yield `Hi ${name}! What is your hobby?`;
  return `${name} likes ${hobby}`;
}
const chat = conversation();
console.log(chat.next().value);// What is your name?   (the first next() starts the generator)
console.log(chat.next("Ann").value);// Hi Ann! What is your hobby?
console.log(chat.next("chess"));// { value: 'Ann likes chess', done: true }

console.log("<<<< return(): stop early, finally still runs >>>>");
function* withCleanup() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log("cleanup!");
  }
}
const g = withCleanup();
console.log(g.next().value);// 1
console.log(g.return("stopped"));// cleanup!  then  { value: 'stopped', done: true }
console.log(g.next());// { value: undefined, done: true }

// break in for...of calls return() for you
for (const n of withCleanup()) {
  if (n === 2) break;
}
// cleanup!

console.log("<<<< throw(): raise an error inside the generator >>>>");
function* resilient() {
  while (true) {
    try {
      yield "working";
    } catch (e) {
      console.log("generator caught:", e.message);
    }
  }
}
const r = resilient();
r.next();
console.log(r.throw(new Error("bad input")).value);// generator caught: bad input  then  working

console.log("<<<< infinite sequences, taken lazily >>>>");
function* naturals() {
  let n = 1;
  while (true) yield n++;
}
function* take(iterable, count) {
  if (count <= 0) return;
  for (const x of iterable) {
    yield x;
    if (--count === 0) return;
  }
}
console.log([...take(naturals(), 5)]);// [ 1, 2, 3, 4, 5 ]

// Iterator helpers (ES2025) do the same with methods
const firstSquaresOfOdds = naturals()
  .filter((n) => n % 2 === 1)
  .map((n) => n * n)
  .take(4)
  .toArray();
console.log(firstSquaresOfOdds);// [ 1, 9, 25, 49 ]

console.log("<<<< practical: unique ID generator >>>>");
function* idGenerator(prefix) {
  let id = 1;
  while (true) yield `${prefix}-${String(id++).padStart(4, "0")}`;
}
const ids = idGenerator("ORD");
console.log(ids.next().value, ids.next().value);// ORD-0001 ORD-0002
