{
    var a=2;
    let b=4;
    const c=5;
}
console.log(a);
console.log(b);/*Gives an error because let has block scope and 
this line has no idea about the b
*/
console.log(c);/*Gives an error because const has block scope and 
this line has no idea about the c*/