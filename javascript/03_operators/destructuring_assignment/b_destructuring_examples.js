
/*
Any iterable, not necessarily arrays, can be destructured
*/
const [x, y] = new Map([
    [1, 2],
    [3, 4],
  ]);
  console.log(x, y); // [1, 2] [3, 4]

/*Non-iterables cannot be destructured as arrays. */
const obj = { 0: "a", 1: "b", length: 2 };
const [a, b] = obj;
// TypeError: obj is not iterable