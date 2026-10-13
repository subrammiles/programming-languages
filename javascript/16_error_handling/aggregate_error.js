/*
AggregateError (ES2021)
One error that holds several errors in .errors
Promise.any() rejects with an AggregateError when every promise fails.
*/
const err = new AggregateError(
  [new Error("disk full"), new Error("network down")],
  "Multiple failures"
);
console.log(err.message);// Multiple failures
console.log(err.errors.map(e => e.message));// [ 'disk full', 'network down' ]

Promise.any([
  Promise.reject(new Error("server 1 failed")),
  Promise.reject(new Error("server 2 failed"))
]).catch(e => {
  console.log(e instanceof AggregateError);// true
  console.log(e.errors.length);// 2
});
