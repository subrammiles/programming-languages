/*
any[] accepts every type and checks nothing about the elements.
*/

const anything: any[] = [];
anything.push("Dylan", 2, true);
console.log(anything); // [ 'Dylan', 2, true ]
// anything[0].toFixed(); // compiles, but would crash: "Dylan" has no toFixed method
