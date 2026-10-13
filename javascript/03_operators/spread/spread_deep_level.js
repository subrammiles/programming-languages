/*
Spread syntax effectively goes one level deep while copying an array. 
Therefore, it may be unsuitable for copying multidimensional arrays.
*/
const a = [[1], [2], [3]];
const b = [...a];

b.shift().shift();
// 1

// Oh no! Now array 'a' is affected as well:
console.log(a);
// [[], [2], [3]]