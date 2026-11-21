/*
Async utilities interviewers ask you to write
  sleep(ms)                   -> a promise that resolves after ms
  promisify(fn)               -> turn a Node-style callback function into one returning a promise
  withTimeout(promise, ms)    -> reject if the promise takes too long
  retry(fn, attempts, delay)  -> try again on failure, waiting longer each time (exponential backoff)
  runSequentially(tasks)      -> run async tasks one after another (not in parallel)
*/

// ---- sleep ----
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ---- promisify ----
// Node-style callback: the LAST argument is a callback(error, result)
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err, result) => (err ? reject(err) : resolve(result)));
    });
  };
}
function divideLater(a, b, callback) {
  setTimeout(() => (b === 0 ? callback(new Error("divide by zero")) : callback(null, a / b)), 10);
}
const divide = promisify(divideLater);// node:util has promisify built in too

// ---- withTimeout ----
function withTimeout(promise, ms) {
  let timerId;
  const timeout = new Promise((_, reject) => {
    timerId = setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timerId));
}

// ---- retry with exponential backoff ----
async function retry(fn, attempts = 3, delay = 100) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn(attempt);
    } catch (err) {
      if (attempt >= attempts) throw err;
      console.log(`  attempt ${attempt} failed (${err.message}), retrying in ${delay}ms`);
      await sleep(delay);
      delay *= 2;// 100, 200, 400 ...
    }
  }
}

// ---- run tasks one after another ----
async function runSequentially(tasks) {
  const results = [];
  for (const task of tasks) results.push(await task());
  return results;
}

async function main() {
  console.log("<<<< sleep >>>>");
  const start = Date.now();
  await sleep(50);
  console.log("slept ~50ms:", Date.now() - start >= 50);// slept ~50ms: true

  console.log("<<<< promisify >>>>");
  console.log(await divide(10, 4));// 2.5
  await divide(1, 0).catch((e) => console.log("error:", e.message));// error: divide by zero

  console.log("<<<< withTimeout >>>>");
  console.log(await withTimeout(sleep(10).then(() => "fast enough"), 100));// fast enough
  await withTimeout(sleep(200), 50).catch((e) => console.log(e.message));// timed out after 50ms

  console.log("<<<< retry with exponential backoff >>>>");
  const flaky = async (attempt) => {
    if (attempt < 3) throw new Error("server busy");
    return "success on attempt " + attempt;
  };
  console.log(await retry(flaky, 5, 20));
  //   attempt 1 failed (server busy), retrying in 20ms
  //   attempt 2 failed (server busy), retrying in 40ms
  // success on attempt 3

  console.log("<<<< run tasks one after another >>>>");
  const order = [];
  const task = (name, ms) => async () => {
    await sleep(ms);
    order.push(name);
    return name;
  };
  console.log(await runSequentially([task("A", 30), task("B", 10), task("C", 20)]));// [ 'A', 'B', 'C' ]
  console.log(order);// [ 'A', 'B', 'C' ]   (Promise.all would finish in order B, C, A)
}

main();
