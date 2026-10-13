/*
Primitive Data Types:
String	
Number
BigInt
Boolean	
Undefined	
Null
Symbol	
*/

console.log("<<<<<<<Numbers>>>>>>>>");
let x=2;
let y=2.3;
let y2 = 123e5;      // =123*10^5=123*100000=12300000
let z2 = 123e-5;     // =123/10^5=0.00123



console.log("<<<<<<<Infinity>>>>>>>>");
let t1=Infinity;
console.log(1/0)//Positive infinity
console.log(-1/0)//Negative infinity
console.log(Infinity)
console.log(-Infinity)
console.log(Number.NEGATIVE_INFINITY)

console.log("<<<<<<<Not a number>>>>>>>>");
console.log("hello"/1);//NaN

console.log("<<<<<<<Undefined>>>>>>>>");
let a;//We declared the varible but we did't defined
console.log(a);
let brt1=undefined;
console.log(brt1)

console.log("<<<<<Null>>>>>");
let b=null;
console.log(b)

console.log("<<<<<<<Strings>>>>>>>>");
let myString="hi";
let myString2=`hi Bro`;
let myString3='how are you'

console.log("<<<<<<<Boolean>>>>>>>>");
let xyu=true;
let bl1=2;
let bl2=3;
console.log(bl1==bl2)

console.log("<<<<<<<Symbol>>>>>>>>");
//declare var Symbol: SymbolConstructor;
//Symbol is a intsance of SymbolConstructor
let sy1= Symbol("app1")
let sy2= Symbol("app1")
console.log(sy1)

/*Big Int */
const alsoHuge = BigInt(9007199254740991);
// 9007199254740991n

const hugeString = BigInt("9007199254740991");
// 9007199254740991n

const hugeHex = BigInt("0x1fffffffffffff");
// 9007199254740991n

const hugeOctal = BigInt("0o377777777777777777");
// 9007199254740991n

const hugeBin = BigInt(
  "0b11111111111111111111111111111111111111111111111111111",
);
// 9007199254740991n









