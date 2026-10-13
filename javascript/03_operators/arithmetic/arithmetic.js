

/*Division (/)*/

console.log(6 /2 );
// Expected output: 3

console.log(6 / '3');
// Expected output: 2

console.log(2 / 0);
// Expected output: Infinity

console.log(3n / 3)
// TypeError: Cannot mix BigInt and other types, use explicit conversions

console.log(3n /  BigInt(3))


/*The division assignment (/=) operator  */
let a = 3;

a /= 2;
console.log(a);
// Expected output: 1.5

a /= 0;
console.log(a);
// Expected output: Infinity

a /= 'hello';
console.log(a);
// Expected output: NaN

//Equality (==)


console.log(1 == 1);
// Expected output: true

console.log('hello' == 'hello');
// Expected output: true

console.log('1' == 1);
// Expected output: true

console.log(0 == false);
// Expected output: true


//Remainder (%)
console.log(13 % 5);
// Expected output: 3
//Remainder assignment (%=)
let a5 = 3;

console.log((a5 %= 2));
// Expected output: 1
