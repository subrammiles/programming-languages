/*
Predict the output: event loop order
Order of execution:
  1. all synchronous code (the call stack runs to the end)
  2. ALL microtasks: promise callbacks (.then, await continuations), queueMicrotask
     (in Node, process.nextTick callbacks run even before promise microtasks)
  3. ONE macrotask: setTimeout / setInterval / I/O callback ... then microtasks again

Things people get wrong:
  - the executor function of `new Promise(fn)` runs SYNCHRONOUSLY
  - code after `await` is a microtask; code before the first `await` is synchronous
  - setTimeout(fn, 0) is never "immediate": it waits for every microtask

Each question runs in its own macrotask so the outputs do not mix.
*/

const questions = [];
const ask = (fn) => questions.push(fn);

ask((done) => {
  console.log("<<<< Q1: the classic >>>>");
  console.log("1");
  setTimeout(() => console.log("2"), 0);
  Promise.resolve().then(() => console.log("3"));
  console.log("4");
  setTimeout(done, 5);
  // 1 4 3 2
});

ask((done) => {
  console.log("<<<< Q2: promise executor is synchronous >>>>");
  console.log("A");
  new Promise((resolve) => {
    console.log("B");// runs right now
    resolve();
    console.log("C");// resolve() does not stop the function
  }).then(() => console.log("D"));
  console.log("E");
  setTimeout(done, 5);
  // A B C E D
});

ask((done) => {
  console.log("<<<< Q3: async / await >>>>");
  async function run() {
    console.log("2");// before the first await: synchronous
    await null;
    console.log("4");// after await: a microtask
  }
  console.log("1");
  run();
  console.log("3");
  setTimeout(done, 5);
  // 1 2 3 4
});

ask((done) => {
  console.log("<<<< Q4: nextTick vs promise vs setTimeout vs setImmediate (Node) >>>>");
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  Promise.resolve().then(() => console.log("promise"));
  process.nextTick(() => console.log("nextTick"));
  console.log("sync");
  setTimeout(done, 10);
  // sync, nextTick, promise, then timeout and immediate
  // (timeout vs immediate order can vary when started from the main module;
  //  inside an I/O callback, immediate always comes first)
});

ask((done) => {
  console.log("<<<< Q5: microtasks scheduled by microtasks run before timers >>>>");
  setTimeout(() => console.log("timeout"), 0);
  Promise.resolve()
    .then(() => {
      console.log("then 1");
      Promise.resolve().then(() => console.log("nested then"));
    })
    .then(() => console.log("then 2"));
  setTimeout(done, 5);
  // then 1, nested then, then 2, timeout
});

ask((done) => {
  console.log("<<<< Q6: the hard one >>>>");
  async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
  }
  async function async2() {
    console.log("async2");
  }
  console.log("script start");
  setTimeout(() => console.log("setTimeout"), 0);
  async1();
  new Promise((resolve) => {
    console.log("promise1");
    resolve();
  }).then(() => console.log("promise2"));
  console.log("script end");
  setTimeout(done, 5);
  // script start
  // async1 start
  // async2
  // promise1
  // script end
  // async1 end
  // promise2
  // setTimeout
});

// Run the questions one by one
(function next() {
  const q = questions.shift();
  if (q) q(next);
})();
