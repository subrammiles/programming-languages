/*
Lookarounds check what is before/after a position WITHOUT including it in the match.
  X(?=Y)   lookahead           -> X followed by Y
  X(?!Y)   negative lookahead  -> X NOT followed by Y
  (?<=Y)X  lookbehind          -> X preceded by Y      (ES2018)
  (?<!Y)X  negative lookbehind -> X NOT preceded by Y
*/
const prices = "Price: $30, €25, $100";

console.log("<<<< lookbehind: numbers after $ >>>>");
console.log(prices.match(/(?<=\$)\d+/g));// [ '30', '100' ]

console.log("<<<< negative lookbehind: numbers NOT after $ >>>>");
console.log(prices.match(/(?<![$\d])\d+/g));// [ '25' ]

console.log("<<<< lookahead: word before 'px' >>>>");
console.log("width: 100px; height: 50em".match(/\d+(?=px)/g));// [ '100' ]

console.log("<<<< password rules with lookaheads >>>>");
// at least 8 chars, one digit, one uppercase, one symbol
const strong = /^(?=.*\d)(?=.*[A-Z])(?=.*[^\w\s]).{8,}$/;
for (const pw of ["password", "Password1", "Passw0rd!"]) {
  console.log(pw, strong.test(pw));
}
// password false
// Password1 false
// Passw0rd! true

console.log("<<<< add commas to a number >>>>");
console.log("1234567".replace(/\B(?=(\d{3})+(?!\d))/g, ","));// 1,234,567
// (In real code prefer: Number(1234567).toLocaleString("en-US"))
