/*
replaceAll(pattern, replacement) (ES2021)
replace() with a string only replaces the FIRST match.
replaceAll() replaces EVERY match.
*/
const text = "cat, cat, cat";

console.log(text.replace("cat", "dog"));// dog, cat, cat
console.log(text.replaceAll("cat", "dog"));// dog, dog, dog

// Before replaceAll you had to use a regex with the g flag
console.log(text.replace(/cat/g, "dog"));// dog, dog, dog

// With a regex, replaceAll requires the g flag
try {
  text.replaceAll(/cat/, "dog");
} catch (e) {
  console.log(e.constructor.name);// TypeError
}
