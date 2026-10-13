/*
Microtasks vs macrotasks
Guess the order before you run it!
*/
console.log("1. sync start");

setTimeout(() => console.log("6. setTimeout (macrotask)"), 0);

Promise.resolve().then(() => console.log("4. promise.then (microtask)"));

queueMicrotask(() => console.log("5. queueMicrotask (microtask)"));

(async () => {
  console.log("2. inside async function - this part is sync");
  await null;
  console.log("4b. after await (microtask)");
})();

console.log("3. sync end");

// Output:
// 1. sync start
// 2. inside async function - this part is sync
// 3. sync end
// 4. promise.then (microtask)
// 5. queueMicrotask (microtask)
// 4b. after await (microtask)
// 6. setTimeout (macrotask)
//
// Why: all synchronous code runs first, then ALL microtasks, then ONE macrotask.
// setTimeout(fn, 0) does not mean "now"; it means "after the current microtasks".

// Run the second demo after the first has finished
setTimeout(() => {
  console.log("<<<< microtasks added by microtasks also run before timers >>>>");
  setTimeout(() => console.log("timer B"), 0);
  Promise.resolve()
    .then(() => console.log("then 1"))
    .then(() => console.log("then 2"))
    .then(() => console.log("then 3"));
  // then 1, then 2, then 3 all print before "timer B"
}, 50);
