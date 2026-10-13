/*
Reflect
A built-in object whose methods match the Proxy traps one-to-one:
  Reflect.get, Reflect.set, Reflect.has, Reflect.deleteProperty, Reflect.ownKeys, ...
Inside a trap, use Reflect to perform the DEFAULT behaviour correctly
(it handles getters, inheritance and the receiver for you).
*/
console.log("<<<< Reflect as plain functions >>>>");
const car = { brand: "Tata" };
console.log(Reflect.has(car, "brand"));// true   (same as "brand" in car)
console.log(Reflect.ownKeys(car));// [ 'brand' ]
Reflect.set(car, "model", "Nexon");
console.log(Reflect.get(car, "model"));// Nexon
console.log(Reflect.deleteProperty(car, "model"));// true

console.log("<<<< why use Reflect inside traps >>>>");
const person = {
  first: "Asha",
  last: "Rao",
  get full() { return `${this.first} ${this.last}`; }
};

// target[prop] runs the getter with this = target, so it skips the proxy
const bad = new Proxy(person, {
  get(target, prop) {
    if (prop === "first") return "PROXIED";
    return target[prop];
  }
});
console.log(bad.full);// Asha Rao  <- getter did not see the proxied value

// Reflect.get passes the receiver (the proxy) as `this`
const good = new Proxy(person, {
  get(target, prop, receiver) {
    if (prop === "first") return "PROXIED";
    return Reflect.get(target, prop, receiver);
  }
});
console.log(good.full);// PROXIED Rao
