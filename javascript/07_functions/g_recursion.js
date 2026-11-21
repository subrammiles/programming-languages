/*
Recursion
A function that calls itself. Every recursive function needs:
  1. a BASE CASE that stops the recursion
  2. a RECURSIVE CASE that moves toward the base case

Each call adds a frame to the call stack. Too many -> "Maximum call stack size exceeded".
JS engines (except Safari) do NOT optimise tail calls, so very deep recursion
should be rewritten as a loop.
Recursion shines on nested data: trees, folders, JSON, DOM, menus.
*/

console.log("<<<< countdown >>>>");
function countdown(n) {
  if (n === 0) {// base case
    console.log("liftoff!");
    return;
  }
  console.log(n);
  countdown(n - 1);// recursive case
}
countdown(3);
// 3
// 2
// 1
// liftoff!

console.log("<<<< sum of an array >>>>");
const sum = ([first, ...rest]) => (first === undefined ? 0 : first + sum(rest));
console.log(sum([1, 2, 3, 4]));// 10

console.log("<<<< walking nested data (a folder tree) >>>>");
const folder = {
  name: "src",
  children: [
    { name: "index.js", size: 120 },
    {
      name: "utils",
      children: [
        { name: "math.js", size: 80 },
        { name: "string.js", size: 50 },
      ],
    },
  ],
};
function totalSize(node) {
  if (!node.children) return node.size;// a file
  return node.children.reduce((total, child) => total + totalSize(child), 0);
}
function printTree(node, indent = "") {
  console.log(indent + node.name);
  node.children?.forEach((child) => printTree(child, indent + "  "));
}
console.log(totalSize(folder));// 250
printTree(folder);
// src
//   index.js
//   utils
//     math.js
//     string.js

console.log("<<<< stack overflow >>>>");
function infinite(n) {
  return infinite(n + 1);// no base case
}
try {
  infinite(0);
} catch (e) {
  console.log(e.constructor.name + ": " + e.message);// RangeError: Maximum call stack size exceeded
}

console.log("<<<< same problem as a loop >>>>");
function sumTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) total += i;
  return total;
}
const sumToRecursive = (n) => (n === 0 ? 0 : n + sumToRecursive(n - 1));
console.log(sumTo(100_000));// 5000050000
try {
  sumToRecursive(100_000);
} catch (e) {
  console.log("recursive version:", e.constructor.name);// recursive version: RangeError
}
