/*
Design pattern: Strategy
Put interchangeable algorithms behind the same interface and pick one at runtime,
instead of a long if/else or switch.
In JS a "strategy" is usually just a function, stored in an object (a lookup table).
*/

console.log("<<<< before: a growing switch >>>>");
function shippingCostSwitch(method, weight) {
  switch (method) {
    case "standard":
      return 5 + weight * 0.5;
    case "express":
      return 15 + weight;
    case "pickup":
      return 0;
    default:
      throw new Error("unknown method");
  }
}
console.log(shippingCostSwitch("express", 4));// 19

console.log("<<<< after: a map of strategies >>>>");
const shippingStrategies = {
  standard: (weight) => 5 + weight * 0.5,
  express: (weight) => 15 + weight,
  pickup: () => 0,
};
// Adding a method = adding one entry; the calculating code never changes
shippingStrategies.drone = (weight) => (weight <= 2 ? 25 : Infinity);

function shippingCost(method, weight) {
  const strategy = shippingStrategies[method];
  if (!strategy) throw new Error(`unknown method: ${method}`);
  return strategy(weight);
}
for (const method of Object.keys(shippingStrategies)) {
  console.log(method, shippingCost(method, 2));
}
// standard 6
// express 17
// pickup 0
// drone 25

console.log("<<<< strategies passed as arguments (sorting) >>>>");
const products = [
  { name: "lamp", price: 30, rating: 4.1 },
  { name: "book", price: 12, rating: 4.8 },
  { name: "pen", price: 2, rating: 3.9 },
];
const sorters = {
  cheapest: (a, b) => a.price - b.price,
  bestRated: (a, b) => b.rating - a.rating,
  name: (a, b) => a.name.localeCompare(b.name),
};
for (const [label, compare] of Object.entries(sorters)) {
  console.log(label, products.toSorted(compare).map((p) => p.name));
}
// cheapest [ 'pen', 'book', 'lamp' ]
// bestRated [ 'book', 'lamp', 'pen' ]
// name [ 'book', 'lamp', 'pen' ]

console.log("<<<< strategy objects with several methods (validation) >>>>");
const validators = {
  email: { test: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), message: "must be an email" },
  minLength8: { test: (v) => v.length >= 8, message: "must be at least 8 characters" },
};
function validate(value, rules) {
  return rules.filter((rule) => !validators[rule].test(value)).map((rule) => validators[rule].message);
}
console.log(validate("ann@example.com", ["email", "minLength8"]));// []
console.log(validate("bad", ["email", "minLength8"]));// [ 'must be an email', 'must be at least 8 characters' ]
