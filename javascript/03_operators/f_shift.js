

const a = 5; // 00000000000000000000000000000101
const b = 2; // 00000000000000000000000000000010

//Left shift (<<)
console.log(a << b); // 00000000000000000000000000010100
// Expected output: 20

//Left shift assignment (<<=)

a <<= 2; // 00000000000000000000000000010100

console.log(a);
// Expected output: 20

//Right shift (>>)
const a3 = 5; //  00000000000000000000000000000101
const b3 = 2; //  00000000000000000000000000000010
const c3 = -5; //  11111111111111111111111111111011

console.log(a3 >> b3); //  00000000000000000000000000000001
// Expected output: 1

console.log(c3 >> b3); //  11111111111111111111111111111110
// Expected output: -2

//Right shift assignment (>>=)

a >>= 2; //  00000000000000000000000000000001
console.log(a);
// Expected output: 1