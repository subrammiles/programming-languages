/*
Promise.try(fn) (ES2025)
Requires Node 23+.
Runs fn and always gives back a promise, whether fn:
  - returns a value      -> fulfilled promise
  - returns a promise    -> that promise
  - throws synchronously -> rejected promise (instead of crashing)
So one .catch() handles both sync and async errors.
*/
function getUser(id) {
  if (!id) throw new Error("id is required");// sync throw
  return Promise.resolve({ id, name: "Asha" });// async result
}

Promise.try(() => getUser(1))
  .then(user => console.log(user));// { id: 1, name: 'Asha' }

Promise.try(() => getUser())
  .catch(err => console.log("caught:", err.message));// caught: id is required

// Without Promise.try, getUser() throws BEFORE a promise exists,
// so .catch() never gets the chance to run:
try {
  getUser().catch(() => console.log("never runs"));
} catch (e) {
  console.log("had to use try/catch:", e.message);
}
