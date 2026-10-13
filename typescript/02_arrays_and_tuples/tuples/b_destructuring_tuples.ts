/*
Tuples are arrays, so they can be destructured.
*/

const point: [number, number] = [34, 45];
const [x, y] = point;
console.log(x, y); // 34 45

function useCounter(): [number, (n: number) => void] {
  let count = 0;
  return [count, (n) => { count += n; console.log("count is", count); }];
}
const [value, increment] = useCounter(); // the pattern React's useState uses
increment(5);
console.log(value);
