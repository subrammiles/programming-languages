/*
Limit concurrency (promise pool)
"You have 100 URLs. Fetch them all, but never more than 3 at once."
Promise.all starts EVERYTHING at once, which can overload a server or hit rate limits.

Idea: start `limit` workers. Each worker takes the next task from a shared index
until none are left. Results are stored by index so they keep the input order.
*/

async function promisePool(tasks, limit) {
  const results = new Array(tasks.length);
  let next = 0;// index of the next task to start (shared by all workers)

  async function worker() {
    while (next < tasks.length) {
      const i = next++;// JS is single-threaded, so no two workers get the same i
      results[i] = await tasks[i]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, worker);
  await Promise.all(workers);
  return results;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let running = 0;
let maxRunning = 0;

const makeTask = (id, ms) => async () => {
  running++;
  maxRunning = Math.max(maxRunning, running);
  console.log(`start ${id}  (running: ${running})`);
  await sleep(ms);
  running--;
  return `result ${id}`;
};

const tasks = [
  makeTask(1, 30),
  makeTask(2, 10),
  makeTask(3, 20),
  makeTask(4, 10),
  makeTask(5, 10),
];

promisePool(tasks, 2).then((results) => {
  console.log(results);
  console.log("most tasks running at once:", maxRunning);
});
// start 1  (running: 1)
// start 2  (running: 2)
// start 3  (running: 2)   <- 2 finished, so 3 starts
// start 4  (running: 2)
// start 5  (running: 2)
// [ 'result 1', 'result 2', 'result 3', 'result 4', 'result 5' ]
// most tasks running at once: 2
