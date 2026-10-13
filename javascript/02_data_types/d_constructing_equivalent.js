

//Primitive values (except NaN ) will always be exactly equal to another
// primitive with an equivalent value. 

const v1 = "abc" + "def";
const v2 = "ab" + "cd" + "ef";
console.log(v1 === v2); // true


//But constructing equivalent non-primitive values will not 
//result in values which are exactly equal.

const obj1 = { name: "subbu" };
const obj2 = { name: "subbu" };
console.log(obj1 === obj2); // false
// As name properties are  primitives:
console.log(obj1.name === obj2.name); // true

console.log("<<<Array>>>>")
const a=[1,2,3];
const b=[12,3];
console.log(a==b) //false

console.log("<<<<Set1>>>>");

const set1=new Set([1,2,3]);
const set2=new Set([1,2,3]);
console.log(set1==set2)//false

