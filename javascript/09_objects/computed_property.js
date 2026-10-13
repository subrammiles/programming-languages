/*
ES6 allows you to use an expression in brackets []. It’ll then use the result of the expression as the property name of an object.
*/

let propName = 'c';

const rank = {
  a: 1,
  b: 2,
  [propName]: 3,
};

console.log(rank.c); // 3