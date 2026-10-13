
//Variables created without a declaration keyword (var, let, or const) are always global, 
// even if they are created inside a function.
function test2(){
    let a=2;
    const b=2;
    var c=4; 
    g=45;
}
test2()
console.log(g) /*Works but you need to call the function*/ 
// console.log(a)//error
// console.log(b)//error
// console.log(c)//error