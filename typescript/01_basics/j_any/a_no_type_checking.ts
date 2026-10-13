
/*any is a type that disables type 
checking and effectively allows all 
types to be used. */

let v: any = true;
v = "string"; // no error as it can be "any" type
Math.round(v); // no error as it can be "any" type 