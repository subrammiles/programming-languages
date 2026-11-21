/*
Deep clone
Shallow copies ({...obj}, Object.assign) share nested objects.
A deep clone copies every level, so changing the copy never touches the original.

Ways to deep clone:
  structuredClone(obj)            -> built in (Node 17+, browsers). Use this in real code.
  JSON.parse(JSON.stringify(obj)) -> loses Dates, undefined, functions, Map/Set; fails on cycles
  write your own                  -> what interviewers ask for (below)

The interview version should handle: nested objects and arrays, Date, Map, Set,
and circular references (an object that points back to itself).
*/

function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;// primitives and functions
  if (seen.has(value)) return seen.get(value);// circular reference: reuse the copy

  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);

  if (value instanceof Map) {
    const copy = new Map();
    seen.set(value, copy);
    value.forEach((v, k) => copy.set(deepClone(k, seen), deepClone(v, seen)));
    return copy;
  }
  if (value instanceof Set) {
    const copy = new Set();
    seen.set(value, copy);
    value.forEach((v) => copy.add(deepClone(v, seen)));
    return copy;
  }

  // Arrays and plain objects; keep the prototype so class instances stay instances
  const copy = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  seen.set(value, copy);
  for (const key of Reflect.ownKeys(value)) {// own keys, including Symbol keys
    copy[key] = deepClone(value[key], seen);
  }
  return copy;
}

const original = {
  name: "Alice",
  born: new Date("1990-05-17"),
  address: { city: "Paris", geo: { lat: 48.85 } },
  tags: ["admin", { level: 3 }],
  roles: new Set(["read", "write"]),
  meta: new Map([["visits", 10]]),
};
original.self = original;// circular

console.log("<<<< shallow copy shares nested objects >>>>");
const shallow = { ...original };
shallow.address.city = "London";
console.log(original.address.city);// London   <- the original changed too!
original.address.city = "Paris";

console.log("<<<< deep clone is fully independent >>>>");
const copy = deepClone(original);
copy.address.geo.lat = 0;
copy.tags[1].level = 99;
copy.roles.add("delete");
console.log(original.address.geo.lat, original.tags[1].level, original.roles.size);// 48.85 3 2
console.log(copy.born instanceof Date, copy.born !== original.born);// true true
console.log(copy.self === copy);// true   (the cycle points to the copy, not the original)

console.log("<<<< why JSON is not enough >>>>");
const viaJson = JSON.parse(JSON.stringify({ when: new Date(0), skip: undefined, set: new Set([1]) }));
console.log(viaJson);// { when: '1970-01-01T00:00:00.000Z', set: {} }

console.log("<<<< structuredClone does the same job, built in >>>>");
const sc = structuredClone(original);
console.log(sc.self === sc, sc.meta.get("visits"));// true 10
