
/*
In arrow functions, this retains the value of the enclosing 
lexical context's this. 
In other words, when evaluating an arrow function's body, 
the language does not create a new this binding.
*/

const globalObject = this;
const foo = () => this;
console.log(foo() === globalObject); // true

const obj = { name: "obj" };

// Attempt to set this using call
console.log(foo.call(obj) === globalObject); // true

// Attempt to set this using bind
const boundFoo = foo.bind(obj);
console.log(boundFoo() === globalObject); // true