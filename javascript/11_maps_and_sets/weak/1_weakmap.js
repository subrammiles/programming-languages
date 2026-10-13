/*
WeakMap
- Keys must be objects (or non-registered symbols).
- Keys are held "weakly": if nothing else refers to the key object,
  it can be garbage collected and the entry disappears.
- Not iterable, no .size (because entries can vanish at any time).
Use it to attach extra data to an object without causing a memory leak.
Methods: set, get, has, delete
*/
console.log("<<<<basic usage>>>>>")
const visits = new WeakMap();
let user = { name: "Asha" };

visits.set(user, 1);
visits.set(user, visits.get(user) + 1);
console.log(visits.get(user));// 2
console.log(visits.has(user));// true

try {
  visits.set("name", 1);
} catch (e) {
  console.log(e.message);// Invalid value used as weak map key
}

user = null;
// Nothing refers to the object anymore, so the garbage collector
// can remove it AND its WeakMap entry. With a normal Map it would stay forever.

console.log("<<<<real use: caching per object>>>>>")
const cache = new WeakMap();
function expensiveTotal(order) {
  if (cache.has(order)) return cache.get(order) + " (cached)";
  const total = order.items.reduce((sum, i) => sum + i, 0);
  cache.set(order, total);
  return total;
}
const order = { items: [100, 250, 50] };
console.log(expensiveTotal(order));// 400
console.log(expensiveTotal(order));// 400 (cached)

console.log("<<<<real use: private data>>>>>")
const privateData = new WeakMap();
class BankAccount {
  constructor(balance) { privateData.set(this, { balance }); }
  get balance() { return privateData.get(this).balance; }
}
const acc = new BankAccount(500);
console.log(acc.balance);// 500
console.log(Object.keys(acc));// [] -> balance is not visible on the object
// (Today you would usually use #private fields instead, see 14_classes)
