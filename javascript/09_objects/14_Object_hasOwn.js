/*
Object.hasOwn(obj, key) (ES2022)
true if the object has the key ITSELF (not inherited through the prototype).
Replacement for obj.hasOwnProperty(key), which breaks in some cases.
*/
const car = { brand: "Tata" };

console.log(Object.hasOwn(car, "brand"));// true
console.log(Object.hasOwn(car, "toString"));// false (inherited from Object.prototype)
console.log("toString" in car);// true  ("in" also checks the prototype chain)

// Why not hasOwnProperty?
const noProto = Object.create(null);// object with no prototype
noProto.id = 1;
try {
  noProto.hasOwnProperty("id");
} catch (e) {
  console.log(e.message);// noProto.hasOwnProperty is not a function
}
console.log(Object.hasOwn(noProto, "id"));// true
