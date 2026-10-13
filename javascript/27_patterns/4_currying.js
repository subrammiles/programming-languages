/*
Currying
Turn f(a, b, c) into f(a)(b)(c).
Lets you create specialised functions by "pre-filling" some arguments.
*/
console.log("<<<< by hand >>>>");
const multiply = (a) => (b) => a * b;
const double = multiply(2);
const triple = multiply(3);
console.log(double(5), triple(5));// 10 15

console.log("<<<< generic curry helper >>>>");
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...more) => curried.apply(this, [...args, ...more]);
  };
}
const volume = curry((l, w, h) => l * w * h);
console.log(volume(2)(3)(4));// 24
console.log(volume(2, 3)(4));// 24
console.log(volume(2)(3, 4));// 24

console.log("<<<< practical: a logger >>>>");
const log = curry((level, module, message) => console.log(`[${level}] ${module}: ${message}`));
const dbError = log("ERROR")("database");
dbError("connection lost");// [ERROR] database: connection lost
dbError("timeout");// [ERROR] database: timeout

console.log("<<<< partial application with bind >>>>");
function greet(greeting, name) { return `${greeting}, ${name}!`; }
const sayHello = greet.bind(null, "Hello");
console.log(sayHello("Asha"));// Hello, Asha!
