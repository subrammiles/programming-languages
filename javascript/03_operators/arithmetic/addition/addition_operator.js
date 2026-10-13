
/*Addition(+) */
/*
The addition (+) operator produces the sum of 
numeric operands or string concatenation.
*/
/*
1.If one side is a string, the other operand is also converted to a string and they are concatenated.
2.If they are both BigInts, BigInt addition is performed. If one side is a BigInt but the other is not, a TypeError is thrown.
*/
console.log(2 + 2);
// Expected output: 4

console.log(2 + true);
// Expected output: 3

console.log(false + false);
// Expected output: 0

console.log('hello ' + 'everyone');
// Expected output: "hello everyone"

console.log(2001 + ': A Space Odyssey');
// Expected output: "2001: A Space Odyssey"
