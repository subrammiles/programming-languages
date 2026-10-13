

/* unknown is assigned to "unknown" or "any" type values */

let a23e: unknown; 
console.log(a); 
let b234: unknown = a23e; 
console.log(b234); 
let c43432: any = a23e; 
console.log(c43432);


let unknown: unknown; 
// let num2345: number = unknown; // Error 
// console.log(num2345); 
/*Type 'unknown' is not assignable to type 'number' */