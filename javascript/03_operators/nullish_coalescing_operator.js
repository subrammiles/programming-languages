/*
The nullish coalescing operator is written as two question marks ??.
The result of a ?? b is:
if a is defined, then a,
if a isn’t defined or null, then b.
*/
console.log("<<<<Test1>>>>>")
let a1;//a is undefined
let b1=2;
let result=a1??b1;//a is undefined so b is assigned to result
console.log(result);

console.log("<<<<Test2>>>>>")
let a2=null;
let b2=33;
let result2=a2??b2;//a is null so r is assigned to result2
console.log(result2)

console.log("<<<<Test3>>>>>")
//We are checking this for 3 varibles
let a3=null;
let b3=null;
let c3=467
let result3=a3??b3??c3;
console.log(result3)

// ?? and || operator
// The important difference between them is that:
// •	|| returns the first truthy value.
// •	?? returns the first defined value.
console.log("<<<<< dif bw || and && >>>>>")
let x1=null;
let y1=null;
let z1=(x1||y1||"Other")
console.log(z1)//other

let x2=false;
let y2=true;
let z2=(x2||y2||"None")
console.log(z2)//true

//Nullish coalescing assignment (??=)
const a = { duration: 50 };

a.duration ??= 10;
console.log(a.duration);
// Expected output: 50

a.speed ??= 25;
console.log(a.speed);
// Expected output: 25