/*
Predict the output: closures and loops
The most famous JS interview question:

  for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0);

`var` creates ONE `i` for the whole loop. By the time the timers run, the loop
has finished and i is 3, so every callback prints 3.
`let` creates a NEW `i` for every iteration, so each callback has its own copy.
*/

console.log("<<<< Q1: var in a loop with setTimeout >>>>");
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 0);
}
// var: 3
// var: 3
// var: 3

setTimeout(() => {
  console.log("<<<< Q2: let in a loop with setTimeout >>>>");
  for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 0);
  }
  // let: 0
  // let: 1
  // let: 2
}, 10);

setTimeout(() => {
  console.log("<<<< Q3: fixing var with an IIFE (the pre-ES6 answer) >>>>");
  for (var k = 0; k < 3; k++) {
    ((captured) => setTimeout(() => console.log("iife:", captured), 0))(k);
  }
  // iife: 0
  // iife: 1
  // iife: 2
}, 20);

setTimeout(() => {
  console.log("<<<< Q4: fixing var with setTimeout's extra argument >>>>");
  for (var m = 0; m < 3; m++) {
    setTimeout((n) => console.log("arg:", n), 0, m);// arguments after the delay go to the callback
  }
  // arg: 0
  // arg: 1
  // arg: 2
}, 30);

setTimeout(() => {
  console.log("<<<< Q5: array of functions built with var >>>>");
  const fns = [];
  for (var n = 0; n < 3; n++) fns.push(() => n);
  console.log(fns.map((f) => f()));// [ 3, 3, 3 ]

  console.log("<<<< Q6: counter with a closure (private state) >>>>");
  function createCounter() {
    let count = 0;
    return { inc: () => ++count, get: () => count };
  }
  const c1 = createCounter();
  const c2 = createCounter();
  c1.inc();
  c1.inc();
  c2.inc();
  console.log(c1.get(), c2.get(), c1.count);// 2 1 undefined   (each counter has its own count)

  console.log("<<<< Q7: closures capture variables, not values >>>>");
  let message = "before";
  const show = () => message;
  message = "after";
  console.log(show());// after
}, 40);
