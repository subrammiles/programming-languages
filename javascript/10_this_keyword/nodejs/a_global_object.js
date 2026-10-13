/*
1.this in NodeJS global scope is the current module.exports object, 
not the "global object". 
2.This is different from a browser where the global scope is the
 global window object.
*/

console.log(this);    // logs {}
//Initially module is empty.Now we are adding the some varibles
module.exports.foo = 5;

console.log(this);   // log { foo:5 }

/*
First we log an empty object because there are no values 
in module.exports in this module. Then we put foo on the 
module.exports object, when we then again log this we can
 see that it now logs the updated module.exports object.
*/