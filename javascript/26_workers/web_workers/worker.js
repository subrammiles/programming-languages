/*
Runs inside the Web Worker.
No access to document or window, but fetch, setTimeout, etc. work.
*/
function countPrimes(limit) {
  let count = 0;
  for (let n = 2; n <= limit; n++) {
    let isPrime = true;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) { isPrime = false; break; }
    if (isPrime) count++;
  }
  return count;
}

self.onmessage = (event) => {
  const start = performance.now();
  const count = countPrimes(event.data);
  self.postMessage({ count, ms: Math.round(performance.now() - start) });
};
