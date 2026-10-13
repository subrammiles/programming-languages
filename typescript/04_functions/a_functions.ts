/*
Typing functions
 parameters always need types; the return type is usually inferred
 optional parameter  p?: T      (must come after required ones)
 default value       p = value  (makes it optional and infers the type)
 rest parameters     ...p: T[]
*/

function getAge(): number {
  return 24;
}

function printHello(): void {
  // void: returns nothing useful
  console.log("Hello");
}

function addTwoNumbers(num1: number, num2: number): number {
  return num1 + num2;
}

function addTwoOrThreeNumbers(num1: number, num2: number, num3?: number): number {
  return num1 + num2 + (num3 ?? 0); // num3 is number | undefined
}

function multiply(num1: number, num2 = 1): number {
  return num1 * num2;
}

function addAll(...numbers: number[]): number {
  return numbers.reduce((sum, n) => sum + n, 0);
}

// "Named parameters": take one object and destructure it
function createUser({ name, age = 18 }: { name: string; age?: number }): string {
  return `${name} (${age})`;
}

console.log(getAge());
printHello();
console.log(addTwoNumbers(2, 3)); // 5
console.log(addTwoOrThreeNumbers(2, 3), addTwoOrThreeNumbers(2, 3, 6)); // 5 11
console.log(multiply(5), multiply(2, 5)); // 5 10
console.log(addAll(), addAll(1, 2, 3, 4)); // 0 10
console.log(createUser({ name: "Asha" }), createUser({ age: 30, name: "Ravi" })); // Asha (18) Ravi (30)
// addTwoNumbers(2);      // error TS2554: Expected 2 arguments, but got 1.
// addTwoNumbers(2, "3"); // error TS2345
