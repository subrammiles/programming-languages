

let firstName: string = "Dylan";
let age: number = 12;
let isValidAge:boolean=false;
let y56: undefined = undefined;
let z45: null = null;


let myvar56:any;
myvar56=true;
myvar56="ty";
myvar56=2;
/* "any" does not refer to any specific type of data*/

/*Unknow data type*/
let w: unknown = 1;
w = "subbu"; // no error

/*never is rarely used, especially by itself, 
its primary use is in advanced generics.*/

let myNeverVar: never; 


//Union data type
//It can be used when value can be more than single data type
//means It can be a string or a number.We use "|",OR symbol

function printStatus(code: string|number){
    console.log(`Status ${code}`)
}


