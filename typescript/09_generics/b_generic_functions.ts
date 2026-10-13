/*
Generic functions
 - TypeScript usually infers the type arguments from the values you pass
 - several type parameters: <K, V>
 - constraints limit what T can be: <T extends { length: number }>
 - defaults: <T = string>
*/

function printDetailsOfStudent<S, T>(v1: S, v2: T): [S, T] {
  console.log(v1, v2);
  return [v1, v2];
}
const pair = printDetailsOfStudent("subbu", 28); // [string, number]
console.log(pair);

function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
console.log(longest("apple", "fig"), longest([1, 2], [1, 2, 3])); // apple [ 1, 2, 3 ]
// longest(10, 20); // error TS2345: number has no length

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { name: "Asha", age: 30 };
console.log(getProperty(user, "name"), getProperty(user, "age")); // Asha 30
// getProperty(user, "email"); // error TS2345: "email" is not a key of user

function mapValues<T, R>(items: T[], f: (item: T) => R): R[] {
  return items.map(f);
}
console.log(mapValues([1, 2, 3], (n) => `#${n}`)); // [ '#1', '#2', '#3' ]

function makeList<T = string>(...items: T[]): T[] {
  return items;
}
console.log(makeList("a", "b"), makeList<number>(1, 2));
