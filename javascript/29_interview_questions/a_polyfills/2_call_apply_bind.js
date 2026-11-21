/*
Polyfills: call, apply, bind
  fn.call(obj, a, b)    -> run fn now, with this = obj, arguments listed
  fn.apply(obj, [a, b]) -> run fn now, with this = obj, arguments in an array
  fn.bind(obj, a)       -> return a NEW function with this = obj (and `a` pre-filled)

The trick behind call/apply: a function called as `obj.method()` gets this = obj.
So we temporarily attach the function to the object, call it, and remove it.
A Symbol key avoids clashing with the object's own properties.
*/

Function.prototype.myCall = function (context, ...args) {
  context = context ?? globalThis;// null/undefined -> global object (non-strict behaviour)
  context = Object(context);// primitives like 5 or "x" become wrapper objects
  const key = Symbol("fn");
  context[key] = this;// `this` is the function myCall was called on
  const result = context[key](...args);
  delete context[key];
  return result;
};

Function.prototype.myApply = function (context, args = []) {
  return this.myCall(context, ...args);
};

Function.prototype.myBind = function (context, ...boundArgs) {
  const original = this;
  function bound(...callArgs) {
    // When used with `new`, `this` is the new object and the bound context is ignored
    if (this instanceof bound) return new original(...boundArgs, ...callArgs);
    return original.myCall(context, ...boundArgs, ...callArgs);
  }
  // Arrow functions and shorthand methods have no prototype, so only copy one if it exists
  if (original.prototype) bound.prototype = Object.create(original.prototype);
  return bound;
};

function introduce(greeting, punctuation) {
  return `${greeting}, I am ${this.name}${punctuation}`;
}
const alice = { name: "Alice" };

console.log("<<<< myCall / myApply >>>>");
console.log(introduce.myCall(alice, "Hi", "!"));// Hi, I am Alice!
console.log(introduce.myApply(alice, ["Hello", "."]));// Hello, I am Alice.
console.log(Math.max.myApply(null, [3, 9, 2]));// 9

console.log("<<<< myBind, with partial arguments >>>>");
const aliceSays = introduce.myBind(alice, "Hey");
console.log(aliceSays("?"));// Hey, I am Alice?

console.log("<<<< bind fixes 'lost this' in callbacks >>>>");
const counter = {
  count: 0,
  inc() {
    this.count++;
    return this.count;
  },
};
const looseInc = counter.inc;
console.log(looseInc());// NaN   (`this` is globalThis here, not counter; in strict mode it would throw)
const boundInc = counter.inc.myBind(counter);
boundInc();
boundInc();
console.log(counter.count);// 2

console.log("<<<< bound function used with new >>>>");
function Point(x, y) {
  this.x = x;
  this.y = y;
}
const PointAtX1 = Point.myBind(null, 1);
const p = new PointAtX1(5);
console.log(p.x, p.y, p instanceof Point);// 1 5 true
