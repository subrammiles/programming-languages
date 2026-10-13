/*
let, const and var with numbers and strings.
TypeScript infers each variable's type from its value.
*/

function testTheVariables(): void {
  let x1 = 1;
  var y1 = 2;
  const z1 = 89;
  console.log(x1 + y1 + z1); // 92

  let x2 = 1.4567;
  var y2 = 2.6789;
  const z2 = 89.45566;
  console.log(x2 + y2 + z2); // 93.59126

  let x3 = "Happy";
  var y3 = " Birthday";
  const z3 = " To you";
  console.log(x3 + y3 + z3); // Happy Birthday To you
}

testTheVariables();
