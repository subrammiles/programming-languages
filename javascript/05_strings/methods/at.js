/*
at(index) (ES2022)
Like str[index], but negative numbers count from the end.
*/
const word = "JavaScript";

console.log(word[0]);// J
console.log(word.at(0));// J

console.log(word[word.length - 1]);// t (old way)
console.log(word.at(-1));// t
console.log(word.at(-2));// p

console.log(word[-1]);// undefined -> [] does not support negative indexes
