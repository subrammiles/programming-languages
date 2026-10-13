/*
Optional chaining ?.
Stops the evaluation and returns undefined if the value before ?. is undefined or null,
instead of throwing "Cannot read properties of undefined".
Three forms:
  obj?.prop
  obj?.[key]
  func?.()
*/
const user = {
  name: "Ravi",
  address: { city: "Hyderabad" },
  greet() { return "Hello " + this.name; }
};
const guest = {};

console.log("<<<<Test1 - without ?. >>>>>")
try {
  console.log(guest.address.city);
} catch (e) {
  console.log(e.message);// Cannot read properties of undefined (reading 'city')
}

console.log("<<<<Test2 - obj?.prop >>>>>")
console.log(user.address?.city);// Hyderabad
console.log(guest.address?.city);// undefined (no error)

console.log("<<<<Test3 - obj?.[key] >>>>>")
const key = "city";
console.log(user.address?.[key]);// Hyderabad
console.log(guest.address?.[key]);// undefined

console.log("<<<<Test4 - func?.() >>>>>")
console.log(user.greet?.());// Hello Ravi
console.log(guest.greet?.());// undefined (greet does not exist, so it is not called)

console.log("<<<<Test5 - works with arrays >>>>>")
let list = null;
console.log(list?.[0]);// undefined
list = [10, 20];
console.log(list?.[0]);// 10

console.log("<<<<Test6 - combine with ?? for a default >>>>>")
console.log(guest.address?.city ?? "Unknown city");// Unknown city

console.log("<<<<Test7 - short-circuit >>>>>")
// If the left side is null/undefined, nothing on the right runs.
let count = 0;
const nothing = null;
nothing?.doSomething(count++);
console.log(count);// 0 -> count++ never ran

// Note: ?. is only for reading/calling. You cannot assign with it:
// guest?.name = "x"; // SyntaxError
