var a=2;
var a="Hi";
/*We cannnot redeclayle using let */
//let b=2;
//let b=3;

// const c=2;
// const c="hi";

///We can re-declayre inside another block scope
let t=2;
function test(){
    let t=4;
  //This works because t=4 is a local and t=2 is a global  
}