/*
Object.entries(obj)      -> [[key, value], ...]
Object.fromEntries(list) -> builds an object back from [[key, value], ...]
Together they let you use array methods (map/filter) on objects.
*/
const prices = { tea: 20, coffee: 150, juice: 75 };

console.log(Object.entries(prices));
// [ [ 'tea', 20 ], [ 'coffee', 150 ], [ 'juice', 75 ] ]

// Add 10% to every price
const increased = Object.fromEntries(
  Object.entries(prices).map(([item, price]) => [item, price * 1.1])
);
console.log(increased);// { tea: 22, coffee: 165, juice: 82.5 }

// Keep only items under 100
const cheap = Object.fromEntries(
  Object.entries(prices).filter(([, price]) => price < 100)
);
console.log(cheap);// { tea: 20, juice: 75 }

// Map -> object
const map = new Map([["a", 1], ["b", 2]]);
console.log(Object.fromEntries(map));// { a: 1, b: 2 }
