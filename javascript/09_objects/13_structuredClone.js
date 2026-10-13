/*
structuredClone(value)
A built-in DEEP copy (Node 17+, all modern browsers).
Spread {...obj} and Object.assign only copy one level deep.
JSON.parse(JSON.stringify(obj)) loses Dates, Maps, Sets, undefined, and fails on circular references.
*/
const original = {
  name: "Asha",
  address: { city: "Delhi" },
  joined: new Date("2024-01-15"),
  tags: new Set(["admin"])
};

console.log("<<<<spread is shallow>>>>>")
const shallow = { ...original };
shallow.address.city = "Mumbai";
console.log(original.address.city);// Mumbai -> original changed!
original.address.city = "Delhi";

console.log("<<<<JSON trick loses types>>>>>")
const viaJson = JSON.parse(JSON.stringify(original));
console.log(typeof viaJson.joined);// string (not a Date)
console.log(viaJson.tags);// {} (Set is lost)

console.log("<<<<structuredClone>>>>>")
const deep = structuredClone(original);
deep.address.city = "Chennai";
console.log(original.address.city);// Delhi -> original unchanged
console.log(deep.joined instanceof Date);// true
console.log(deep.tags.has("admin"));// true

console.log("<<<<handles circular references>>>>>")
const node = { value: 1 };
node.self = node;
const copy = structuredClone(node);
console.log(copy.self === copy);// true

console.log("<<<<cannot clone functions>>>>>")
try {
  structuredClone({ fn() {} });
} catch (e) {
  console.log(e.constructor.name);// DOMException (DataCloneError)
}
