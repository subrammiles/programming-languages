/*
Predict the output: `this`
`this` is decided by HOW a function is called, not where it is written:
  obj.method()        -> this = obj
  plainFunction()     -> this = undefined in strict mode, globalThis otherwise
  new Fn()            -> this = the new object
  fn.call(obj)        -> this = obj
  arrow function      -> no own `this`; it uses the `this` of the surrounding code

This file runs as CommonJS, where top-level `this` is module.exports ({}).
*/
"use strict";

const user = {
  name: "Alice",
  regular() {
    return this?.name;
  },
  arrow: () => typeof this,// `this` of the module scope, not of user
  delayed() {
    return [1].map(function () {
      return this?.name;// a plain function callback: this is undefined (strict)
    });
  },
  delayedArrow() {
    return [1].map(() => this.name);// the arrow uses delayedArrow's this = user
  },
};

console.log("<<<< Q1: method call >>>>");
console.log(user.regular());// Alice

console.log("<<<< Q2: method taken out of its object >>>>");
const fn = user.regular;
console.log(fn());// undefined   (plain call: this is undefined)

console.log("<<<< Q3: arrow function as a method >>>>");
console.log(user.arrow());// object   (module scope this = module.exports = {})

console.log("<<<< Q4: plain function vs arrow inside a method >>>>");
console.log(user.delayed());// [ undefined ]
console.log(user.delayedArrow());// [ 'Alice' ]

console.log("<<<< Q5: method passed as a callback >>>>");
function callLater(callback) {
  return callback();
}
console.log(callLater(user.regular));// undefined
console.log(callLater(() => user.regular()));// Alice
console.log(callLater(user.regular.bind(user)));// Alice

console.log("<<<< Q6: call overrides, but not for arrows or bound functions >>>>");
const bob = { name: "Bob" };
console.log(user.regular.call(bob));// Bob
console.log(user.regular.bind(user).call(bob));// Alice   (bind wins; it cannot be re-bound)

console.log("<<<< Q7: nested object >>>>");
const outer = {
  name: "outer",
  inner: {
    name: "inner",
    getName() {
      return this.name;
    },
  },
};
console.log(outer.inner.getName());// inner   (the object right before the dot)

console.log("<<<< Q8: `this` in a class callback >>>>");
class Button {
  label = "Save";
  handleClick() {
    return this?.label;
  }
  handleClickArrow = () => this.label;// class field arrow: bound to the instance
}
const btn = new Button();
const { handleClick, handleClickArrow } = btn;
console.log(handleClick());// undefined   (class bodies are always strict)
console.log(handleClickArrow());// Save
