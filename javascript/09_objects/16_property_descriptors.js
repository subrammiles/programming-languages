/*
Property descriptors
Every property has hidden settings ("attributes"):
  value        -> the value
  writable     -> can the value be changed?
  enumerable   -> does it show up in for...in, Object.keys, JSON.stringify, spread?
  configurable -> can it be deleted, or its attributes changed?
Properties created normally have all three set to true.
Object.defineProperty defaults them all to FALSE.

This is how built-ins hide methods (Array.prototype.map is not enumerable)
and how Object.freeze works (it sets writable and configurable to false).
*/

const user = { name: "Ann" };

console.log("<<<< reading a descriptor >>>>");
console.log(Object.getOwnPropertyDescriptor(user, "name"));
// { value: 'Ann', writable: true, enumerable: true, configurable: true }

console.log("<<<< defineProperty: read-only, hidden property >>>>");
Object.defineProperty(user, "id", { value: 42 });// writable/enumerable/configurable all false
user.id = 99;// silently ignored (a TypeError in strict mode)
console.log(user.id);// 42
console.log(Object.keys(user), JSON.stringify(user));// [ 'name' ] {"name":"Ann"}
console.log("id" in user);// true   (it exists, it is just hidden)
delete user.id;// ignored: not configurable
console.log(user.id);// 42

console.log("<<<< enumerable: false hides from loops and copies >>>>");
const account = { owner: "Bo" };
Object.defineProperty(account, "password", { value: "secret", enumerable: false, writable: true });
console.log({ ...account });// { owner: 'Bo' }
for (const key in account) console.log("key:", key);// key: owner

console.log("<<<< accessor properties: get / set >>>>");
const temperature = { celsius: 20 };
Object.defineProperty(temperature, "fahrenheit", {
  get() {
    return this.celsius * 1.8 + 32;
  },
  set(f) {
    this.celsius = (f - 32) / 1.8;
  },
  enumerable: true,
});
console.log(temperature.fahrenheit);// 68
temperature.fahrenheit = 212;
console.log(temperature.celsius);// 100

console.log("<<<< all descriptors at once >>>>");
console.log(Object.getOwnPropertyDescriptors(temperature));
// {
//   celsius: { value: 100, writable: true, enumerable: true, configurable: true },
//   fahrenheit: {
//     get: [Function: get],
//     set: [Function: set],
//     enumerable: true,
//     configurable: false
//   }
// }

console.log("<<<< copying getters properly >>>>");
const spreadCopy = { ...temperature };// runs the getter, copies the VALUE
const realCopy = Object.defineProperties({}, Object.getOwnPropertyDescriptors(temperature));
console.log(Object.getOwnPropertyDescriptor(spreadCopy, "fahrenheit").get);// undefined
console.log(typeof Object.getOwnPropertyDescriptor(realCopy, "fahrenheit").get);// function

console.log("<<<< ways to list keys >>>>");
const sym = Symbol("tag");
const obj = { visible: 1, [sym]: 2 };
Object.defineProperty(obj, "hidden", { value: 3 });
console.log(Object.keys(obj));// [ 'visible' ]
console.log(Object.getOwnPropertyNames(obj));// [ 'visible', 'hidden' ]
console.log(Object.getOwnPropertySymbols(obj));// [ Symbol(tag) ]
console.log(Reflect.ownKeys(obj));// [ 'visible', 'hidden', Symbol(tag) ]

console.log("<<<< built-ins use this >>>>");
console.log(Object.getOwnPropertyDescriptor(Array.prototype, "map").enumerable);// false
console.log(Object.getOwnPropertyDescriptor(Math, "PI"));
// {
//   value: 3.141592653589793,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
