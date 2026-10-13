

console.log(1 == 1);
// Expected output: true

console.log('hello' == 'hello');
// Expected output: true

console.log('1' == 1);
// Expected output: true

console.log(0 == false);
// Expected output: true

"1" == 1; // true
1 == "1"; // true
0 == false; // true
0 == null; // false
0 == undefined; // false
0 == !!null; // true, look at Logical NOT operator
0 == !!undefined; // true, look at Logical NOT operator
null == undefined; // true

const number1 = new Number(3);
const number2 = new Number(3);
number1 == 3; // true
number1 == number2; // false

/*Comparison of objects */
const object1 = {
    key: "value",
  };
  
  const object2 = {
    key: "value",
  };
  
  console.log(object1 == object2); // false
  console.log(object1 == object1); // true


  /*Comparing strings and String objects */
  const string1 = "hello";
const string2 = String("hello");
const string3 = new String("hello");
const string4 = new String("hello");

console.log(string1 == string2); // true
console.log(string1 == string3); // true
console.log(string2 == string3); // true
console.log(string3 == string4); // false
console.log(string4 == string4); // true

/*Comparing Dates and strings */
const d = new Date("1995-12-17T03:24:00");
const s = d.toString(); // for example: "Sun Dec 17 1995 03:24:00 GMT-0800 (Pacific Standard Time)"
console.log(d == s); //true

/*Comparing arrays and strings */
const as1 = [1, 2, 3];
const as2 = "1,2,3";
as1 == as2; // true, `a` converts to string

const as3 = [true, 0.5, "hey"];
const as4 = as3.toString(); // "true,0.5,hey"
as3 == as4; // true