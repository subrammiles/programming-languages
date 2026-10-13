/*
The addition assignment (+=) operator performs addition (which is either numeric addition or string concatenation) on the two operands and 
assigns the result to the left operand.
x += y is equivalent to x = x + y, except that 
the expression x is only evaluated once.
*/

let a = 2;
let b = 'hello';

console.log((a += 3)); // Addition
// Expected output: 5

console.log((b += ' world')); // Concatenation
// Expected output: "hello world"


// Number + String -> concatenation
bar += "foo"; // "7foo"



// String + Boolean -> concatenation
foo += false; // "foofalse"

// String + String -> concatenation
foo += "bar"; // "foofalsebar"


let x = 1n;

// BigInt + BigInt -> addition
x += 2n; // 3n

// BigInt + Number -> throws TypeError
x += 1; // TypeError: Cannot mix BigInt and other types, use explicit conversions