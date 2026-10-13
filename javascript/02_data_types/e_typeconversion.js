///String
console.log("<<<<<<<<String>>>>>>>>>>>")
let value = true;
console.log(typeof value); // boolean
value = String(value); // now value is a string "true"
console.log(typeof value); // string
console.log(typeof "null") //String

console.log("<<<<<<<<Numeric>>>>>>>>>>>")
//Numeric
let op1=("6" / "2");
console.log(typeof  op1); //string .strings are converted to numbers automatically
let str = "123";
console.log(typeof str); // string
let num = Number(str); // becomes a number 123
console.log(typeof num); // number

console.log( Number("   123   ") ); // 123
console.log( Number("123z") );      // NaN (error reading a number at "z")
console.log( Number(true) );        // 1
console.log( Number(false) );   //0    

console.log("<<<<<<<<Boolean>>>>>>>>>>>")
console.log( Boolean(1) ); // true
console.log( Boolean(0) ); // false
console.log( Boolean("hello") ); // true
console.log( Boolean("") ); // false

//
console.log(Number(2n))
