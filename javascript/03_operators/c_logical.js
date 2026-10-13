

const a = 3;
const b = -2;

console.log(a > 0 && b > 0);
// Expected output: false

//Logical AND assignment (&&=)
a &&= 2;
console.log(a);
// Expected output: 2

b &&= 2;
console.log(b);
// Expected output: 0


//Logical NOT (!)
console.log(!(a > 0 || b > 0));
// Expected output: false

//Logical OR (||)
console.log(a > 0 || b > 0);
// Expected output: true

//Logical OR assignment (||=)
const a2 = { duration: 50, title: '' };

a2.duration ||= 10;
console.log(a2.duration);
// Expected output: 50

a2.title ||= 'title is empty.';
console.log(a2.title);
// Expected output: "title is empty"