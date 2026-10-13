/*
Object.groupBy(items, fn) / Map.groupBy(items, fn) (ES2024)
Requires Node 21+.
Groups items by the key the callback returns.
Before this, you had to write it yourself with reduce().
*/
const people = [
  { name: "Asha", city: "Delhi" },
  { name: "Ravi", city: "Pune" },
  { name: "Meena", city: "Delhi" }
];

console.log("<<<<Object.groupBy>>>>>")
const byCity = Object.groupBy(people, p => p.city);
console.log(byCity);
// {
//   Delhi: [ { name: 'Asha', city: 'Delhi' }, { name: 'Meena', city: 'Delhi' } ],
//   Pune: [ { name: 'Ravi', city: 'Pune' } ]
// }

console.log("<<<<Map.groupBy>>>>>")
// Use Map.groupBy when the key is not a string
const numbers = [1, 2, 3, 4, 5];
const evenOdd = Map.groupBy(numbers, n => n % 2 === 0 ? "even" : "odd");
console.log(evenOdd.get("even"));// [ 2, 4 ]
console.log(evenOdd.get("odd"));// [ 1, 3, 5 ]

console.log("<<<<The old way with reduce>>>>>")
const byCityOld = people.reduce((groups, p) => {
  (groups[p.city] ??= []).push(p);
  return groups;
}, {});
console.log(Object.keys(byCityOld));// [ 'Delhi', 'Pune' ]
