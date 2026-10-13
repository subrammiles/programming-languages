/*
worker_threads - run CPU-heavy work on another thread in Node.js
Run: node 1_main.js
*/
const { Worker } = require("node:worker_threads");
const path = require("node:path");

function countPrimesInWorker(limit) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, "2_prime_worker.js"), {
      workerData: { limit }// data available to the worker at start
    });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

async function main() {
  // A timer to prove the main thread is NOT blocked while the worker runs
  const ticker = setInterval(() => console.log("  main thread is still responsive"), 200);

  console.time("4 workers in parallel");
  const limits = [2_000_000, 2_000_000, 2_000_000, 2_000_000];
  const results = await Promise.all(limits.map(countPrimesInWorker));
  console.timeEnd("4 workers in parallel");
  console.log("primes found:", results);// [ 148933, 148933, 148933, 148933 ]

  clearInterval(ticker);
}
main();
