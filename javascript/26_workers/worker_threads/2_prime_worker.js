/*
This file runs inside a worker thread.
workerData -> data passed in from the main thread
parentPort -> used to send the result back
*/
const { workerData, parentPort } = require("node:worker_threads");

function countPrimes(limit) {
  let count = 0;
  for (let n = 2; n <= limit; n++) {
    let isPrime = true;
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) { isPrime = false; break; }
    }
    if (isPrime) count++;
  }
  return count;
}

parentPort.postMessage(countPrimes(workerData.limit));
