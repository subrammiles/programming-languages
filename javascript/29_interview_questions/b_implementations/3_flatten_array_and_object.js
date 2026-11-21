/*
Flatten an array / flatten an object
Two classic "write it yourself" questions.

  flatten([1, [2, [3]]])              -> [1, 2, 3]       (Array.prototype.flat(Infinity) does this)
  flattenObject({a: {b: 1}})          -> {"a.b": 1}      (useful for forms, query strings, configs)
  unflattenObject({"a.b": 1})         -> {a: {b: 1}}
*/

console.log("<<<< flatten array: recursion, with a depth >>>>");
function flatten(arr, depth = Infinity) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) result.push(...flatten(item, depth - 1));
    else result.push(item);
  }
  return result;
}
const nested = [1, [2, [3, [4, [5]]]], 6];
console.log(flatten(nested));// [ 1, 2, 3, 4, 5, 6 ]
console.log(flatten(nested, 1));// [ 1, 2, [ 3, [ 4, [Array] ] ], 6 ]
console.log(nested.flat(Infinity));// [ 1, 2, 3, 4, 5, 6 ]   (built in)

console.log("<<<< flatten array: with reduce >>>>");
const flattenReduce = (arr) => arr.reduce((acc, x) => acc.concat(Array.isArray(x) ? flattenReduce(x) : x), []);
console.log(flattenReduce(nested));// [ 1, 2, 3, 4, 5, 6 ]

console.log("<<<< flatten array: iterative, with a stack (no recursion limit) >>>>");
function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) stack.push(...item);
    else result.push(item);
  }
  return result.reverse();// we popped from the end, so reverse to restore order
}
console.log(flattenIterative(nested));// [ 1, 2, 3, 4, 5, 6 ]

console.log("<<<< flatten object >>>>");
function flattenObject(obj, prefix = "", result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && Object.keys(value).length > 0) {
      flattenObject(value, path, result);// arrays use their index as the key
    } else {
      result[path] = value;
    }
  }
  return result;
}
const user = { name: "Bob", address: { city: "Rome", zip: { code: "00100" } }, langs: ["js", "go"] };
console.log(flattenObject(user));
// {
//   name: 'Bob',
//   'address.city': 'Rome',
//   'address.zip.code': '00100',
//   'langs.0': 'js',
//   'langs.1': 'go'
// }

console.log("<<<< unflatten object >>>>");
function unflattenObject(flat) {
  const result = {};
  for (const [path, value] of Object.entries(flat)) {
    const keys = path.split(".");
    let node = result;
    keys.forEach((key, i) => {
      if (i === keys.length - 1) node[key] = value;
      else node = node[key] ??= /^\d+$/.test(keys[i + 1]) ? [] : {};// next key numeric -> array
    });
  }
  return result;
}
console.log(JSON.stringify(unflattenObject(flattenObject(user))));
// {"name":"Bob","address":{"city":"Rome","zip":{"code":"00100"}},"langs":["js","go"]}
