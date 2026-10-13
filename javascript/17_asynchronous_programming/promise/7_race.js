/*
Promise.race(promises)
Settles as soon as the FIRST promise settles (fulfilled OR rejected).
Common use: adding a timeout to a slow operation.
*/
const fast = new Promise(resolve => setTimeout(resolve, 100, "fast"));
const slow = new Promise(resolve => setTimeout(resolve, 500, "slow"));

Promise.race([fast, slow]).then(value => console.log(value));// fast

// Timeout pattern
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms));
  return Promise.race([promise, timeout]);
}

const slowRequest = new Promise(resolve => setTimeout(resolve, 2000, "data"));
withTimeout(slowRequest, 300)
  .then(console.log)
  .catch(e => console.log(e.message));// Timed out after 300ms
