/*Let’s try the combination of a function declaration and expression. */


x(); 
/*Uncaught ReferenceError ReferenceError: 
Cannot access 'test' before initialization */
console.log(x) //undefined
var x = function test(){
    console.log("This is a test function")
}
/*We can call it here*/
x(); // works
