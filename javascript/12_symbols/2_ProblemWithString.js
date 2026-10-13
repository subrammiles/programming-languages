
///Primitive values (except for the mystical NaN value) will always be exactly equal to another 
//primitive with an equivalent value.

const w1 = "abc" + "de";
const w2 = "ab" + "cd" + "e";
console.log(w1 === w2); // true
let x={};
x["ab"]="Apple";
x["abc"]="Mango";
x[w1]="Orange";
x[w2]="Graphs";
console.log(x)