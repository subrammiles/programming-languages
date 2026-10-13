/*
Promise.any(promises) (ES2021)
Fulfills with the FIRST promise that FULFILLS. Rejections are ignored...
...unless ALL reject, then it rejects with an AggregateError.

  Promise.all        -> all must succeed, fails on first failure
  Promise.allSettled -> waits for all, never fails
  Promise.race       -> first to settle (success OR failure)
  Promise.any        -> first to succeed
*/
const mirror1 = new Promise((_, reject) => setTimeout(reject, 50, new Error("mirror1 down")));
const mirror2 = new Promise(resolve => setTimeout(resolve, 200, "file from mirror2"));
const mirror3 = new Promise(resolve => setTimeout(resolve, 400, "file from mirror3"));

Promise.any([mirror1, mirror2, mirror3])
  .then(result => console.log(result));// file from mirror2

Promise.any([
  Promise.reject(new Error("a")),
  Promise.reject(new Error("b"))
]).catch(err => {
  console.log(err.constructor.name);// AggregateError
  console.log(err.errors.map(e => e.message));// [ 'a', 'b' ]
});
