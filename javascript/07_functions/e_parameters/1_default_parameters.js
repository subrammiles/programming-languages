/*
Default parameters
A default is used when the argument is missing OR is undefined (but not for null).
Defaults are evaluated at CALL time, left to right, so they can use earlier parameters.
*/

console.log("<<<< basic defaults >>>>");
function greet(name = "guest", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}
console.log(greet());// Hello, guest!
console.log(greet("Ann"));// Hello, Ann!
console.log(greet(undefined, "Hi"));// Hi, guest!   (undefined triggers the default)
console.log(greet(null));// Hello, null!   (null does not)

console.log("<<<< the old way, before ES2015 >>>>");
function oldGreet(name) {
  name = name || "guest";// bug: also replaces "", 0 and false
  return "Hello, " + name;
}
console.log(oldGreet(""));// Hello, guest

console.log("<<<< defaults can use earlier parameters and expressions >>>>");
function rectangle(width, height = width, area = width * height) {
  return { width, height, area };
}
console.log(rectangle(4));// { width: 4, height: 4, area: 16 }

console.log("<<<< evaluated on every call (a new array each time) >>>>");
function addItem(item, list = []) {
  list.push(item);
  return list;
}
console.log(addItem("a"), addItem("b"));// [ 'a' ] [ 'b' ]   (Python users: no shared default here)

console.log("<<<< required parameters >>>>");
const required = (name) => {
  throw new Error(`${name} is required`);
};
function createUser(email = required("email")) {
  return { email };
}
try {
  createUser();
} catch (e) {
  console.log(e.message);// email is required
}

console.log("<<<< defaults with destructuring (options object) >>>>");
function connect({ host = "localhost", port = 5432, ssl = false } = {}) {
  return `${host}:${port} ssl=${ssl}`;
}
console.log(connect());// localhost:5432 ssl=false
console.log(connect({ port: 3306, ssl: true }));// localhost:3306 ssl=true

console.log("<<<< function.length ignores defaulted parameters >>>>");
console.log(greet.length, rectangle.length);// 0 1
