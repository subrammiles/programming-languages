/*
at(index) (ES2022)
Negative index counts from the end.
*/
const colors = ["red", "green", "blue"];

console.log(colors.at(0));// red
console.log(colors.at(-1));// blue
console.log(colors[colors.length - 1]);// blue (old way)
console.log(colors[-1]);// undefined
