/*
In TypeScript a variable keeps the type it started with.
*/

function testTheVariablesMutability(): void {
  let x1 = 1; // inferred as number
  var y1 = 2;
  // x1 = "Subbu"; // error TS2322: Type 'string' is not assignable to type 'number'.
  // y1 = "Subbu"; // same error
  x1 = 10; // another number is fine
  console.log(x1, y1); // 10 2

  let flexible: number | string = 1; // say so explicitly if you need both
  flexible = "now a string";
  console.log(flexible);
}

testTheVariablesMutability();
