/*
once(fn) - a function that can only run one time
Use for: initialization, "submit" buttons, connecting to a database.
*/
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

const connect = once(() => {
  console.log("connecting to database...");
  return { connected: true };
});

console.log(connect());// connecting to database...  { connected: true }
console.log(connect());// { connected: true }  (no second "connecting")
console.log(connect() === connect());// true -> same object every time
