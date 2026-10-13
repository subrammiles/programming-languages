/*
find(fn)          -> first element where fn returns true (or undefined)
findIndex(fn)     -> index of that element (or -1)
findLast(fn)      -> last matching element  (ES2023)
findLastIndex(fn) -> index of last match    (ES2023)
Unlike filter(), these stop at the first match and return ONE element.
*/
const orders = [
  { id: 1, status: "paid" },
  { id: 2, status: "pending" },
  { id: 3, status: "paid" },
  { id: 4, status: "pending" }
];

console.log(orders.find(o => o.status === "pending"));// { id: 2, status: 'pending' }
console.log(orders.findIndex(o => o.status === "pending"));// 1

console.log(orders.findLast(o => o.status === "paid"));// { id: 3, status: 'paid' }
console.log(orders.findLastIndex(o => o.status === "paid"));// 2

console.log(orders.find(o => o.status === "cancelled"));// undefined
console.log(orders.findIndex(o => o.status === "cancelled"));// -1
