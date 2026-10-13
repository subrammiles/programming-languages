
const w1 = "hi";
const w2 = "hi";
console.log(w1 === w2); // true

const s1 = Symbol("hi");
const s2 = Symbol("hi");
console.log(s1 === s2); // false

/*You can see ,w1 and w2 values are same. 
If you equal them it return true. 
For symbols s1 and s2 values are same , “hi”. 
But if you apply strict equal operator ,
it will give you an error.   */