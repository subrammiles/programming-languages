/*
readonly arrays can't be changed: no push, pop, sort or index assignment.
Use them for function parameters to promise you won't modify the caller's array.
 readonly string[]   or   ReadonlyArray<string>
*/

const colors: readonly string[] = ["red", "green"];
// colors.push("blue"); // error TS2339: Property 'push' does not exist on type 'readonly string[]'.
// colors[0] = "pink";  // error TS2542: Index signature in type 'readonly string[]' only permits reading.

function total(prices: readonly number[]): number {
  return prices.reduce((sum, p) => sum + p, 0);
}
console.log(total([10, 20, 30])); // 60

const sorted = colors.toSorted(); // non-mutating methods are allowed (ES2023)
console.log(sorted, colors);
