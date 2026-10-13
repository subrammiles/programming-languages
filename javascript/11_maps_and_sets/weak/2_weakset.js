/*
WeakSet
- Values must be objects.
- Held weakly, like WeakMap keys.
- Not iterable, no .size.
Methods: add, has, delete
Use it to "mark" objects (seen, visited, processed) without keeping them alive.
*/
const processed = new WeakSet();

function processOnce(job) {
  if (processed.has(job)) {
    console.log(`job ${job.id} already processed, skipping`);
    return;
  }
  console.log(`processing job ${job.id}`);
  processed.add(job);
}

const job1 = { id: 1 };
processOnce(job1);// processing job 1
processOnce(job1);// job 1 already processed, skipping
processOnce({ id: 2 });// processing job 2

console.log("<<<<detect circular references>>>>>")
function hasCycle(obj, seen = new WeakSet()) {
  if (typeof obj !== "object" || obj === null) return false;
  if (seen.has(obj)) return true;
  seen.add(obj);
  return Object.values(obj).some(v => hasCycle(v, seen));
}
const a = { name: "a" };
a.me = a;
console.log(hasCycle(a));// true
console.log(hasCycle({ x: { y: 1 } }));// false
