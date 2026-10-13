
const w1 = "abc" + "de";
const w2 = "ab" + "cd" + "e";
console.log(w1 === w2); // true
let x={};
x["ab"]="Apple";
x["abc"]="Mango";
x[w1]="Orange";
x[w2]="Graphs";// The value is changed because same key
console.log(x)
x[Symbol(w1)] = "Orange";;
x[Symbol(w2)] = "Graphs" //value is Not changed
console.log(x)