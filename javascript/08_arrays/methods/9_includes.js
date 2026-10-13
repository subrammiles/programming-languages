/*
includes(value) -> true/false
Unlike indexOf, includes can find NaN.
*/
const fruits = ["apple", "banana", "mango"];

console.log(fruits.includes("mango"));// true
console.log(fruits.includes("grape"));// false

const values = [1, NaN, 3];
console.log(values.indexOf(NaN));// -1  (indexOf uses ===, and NaN !== NaN)
console.log(values.includes(NaN));// true
