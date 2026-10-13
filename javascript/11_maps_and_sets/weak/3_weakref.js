/*
WeakRef and FinalizationRegistry (ES2021)
WeakRef holds a reference to an object WITHOUT preventing garbage collection.
  ref.deref() -> the object, or undefined if it was collected.
FinalizationRegistry lets you run a callback after an object is collected.

Garbage collection timing is not predictable. Use these rarely (e.g. large caches).
Run with:  node --expose-gc 3_weakref.js   to force collection in this demo.
*/
let bigData = { payload: new Array(1_000_000).fill("x") };
const ref = new WeakRef(bigData);

const registry = new FinalizationRegistry((label) => {
  console.log(`${label} was garbage collected`);
});
registry.register(bigData, "bigData");

console.log(ref.deref() !== undefined);// true -> still alive

bigData = null;// remove the only strong reference

setTimeout(() => {
  if (global.gc) global.gc();
  setTimeout(() => {
    const obj = ref.deref();
    console.log(obj === undefined ? "deref() -> undefined (collected)" : "still alive (GC has not run yet)");
  }, 100);
}, 0);
