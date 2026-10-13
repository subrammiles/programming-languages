/*
When creating a variable, there are two main ways TypeScript assigns a type:
Explicit
Implicit
*/

/*In Explicit ,We will mention type*/
let lastName456: string = "Dylan"; //string type
let isActive45:boolean=true;//boolean type
let myNumber234:number=34; //number

/*Implicit - TypeScript will "guess" the type, based on the assigned value*/
let lastName455 = "Dylan";
let isActive46=true;
let myNumber233=34;

//lastName455=3;/*Type 'number' is not assignable to type 'string' */
//TypeScript will "guess"(infer) the type as string , based on the assigned value