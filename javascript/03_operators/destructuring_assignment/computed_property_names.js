//Computed property names, like on object literals, can be used with destructuring.

const key = "z";
const { [key]: foo } = { z: "bar" };

console.log(foo); // "bar"