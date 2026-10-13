

/*TypeScript will "guess" the type, based on the assigned value*/
let lastName457 = "Dylan";
//lastName455=3;/*Type 'number' is not assignable to type 'string' */

/*It may not always properly infer what the type of a variable may be. 
In such cases, it will set the type to "any" which disables type checking.*/
const json = JSON.parse("55");

// Most expect json to be an object, but it can be a string or a number like this example
console.log(typeof json);