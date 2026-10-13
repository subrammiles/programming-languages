

//Two ways
//1.Using "as" keyword
//2.casting with <>
let x56:unknown='hello';
console.log((x56 as string).length)
console.log((<string>x56).length)
