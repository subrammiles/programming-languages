/*
Proxy
new Proxy(target, handler) wraps an object and lets you intercept operations on it.
The handler's methods are called "traps":
  get(target, prop, receiver)        -> reading obj.prop
  set(target, prop, value, receiver) -> writing obj.prop = value
  has(target, prop)                  -> "prop" in obj
  deleteProperty(target, prop)       -> delete obj.prop
  apply, construct, ownKeys, ...     -> and more
If a trap is missing, the operation goes straight to the target.
*/
const user = { name: "Asha", age: 30 };

const logged = new Proxy(user, {
  get(target, prop) {
    console.log(`reading "${String(prop)}"`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`writing "${String(prop)}" = ${value}`);
    target[prop] = value;
    return true;// must return true, otherwise strict mode throws a TypeError
  }
});

logged.name;// reading "name"
logged.age = 31;// writing "age" = 31
console.log(user.age);// 31 -> the target object was changed

console.log("<<<< default values for missing keys >>>>");
const withDefault = new Proxy({}, {
  get: (target, prop) => (prop in target ? target[prop] : 0)
});
withDefault.apples = 5;
console.log(withDefault.apples, withDefault.oranges);// 5 0

console.log("<<<< negative array indexes (python style) >>>>");
const arr = new Proxy([10, 20, 30], {
  get(target, prop) {
    const i = Number(prop);
    return Number.isInteger(i) && i < 0 ? target[target.length + i] : target[prop];
  }
});
console.log(arr[-1], arr[0], arr.length);// 30 10 3
