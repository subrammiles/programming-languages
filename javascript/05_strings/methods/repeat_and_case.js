/*
repeat(count), toUpperCase(), toLowerCase()
*/
console.log("ab".repeat(3));// ababab
console.log("-".repeat(20));// --------------------

console.log("Hello".toUpperCase());// HELLO
console.log("Hello".toLowerCase());// hello

// Case-insensitive comparison
console.log("JavaScript".toLowerCase() === "javascript");// true

// Capitalize the first letter
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
console.log(capitalize("india"));// India
