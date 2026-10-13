/*Function expressions, however are not hoisted. */
/* We can't call it here*/
test(); /*Error: Uncaught ReferenceError */
const test = function(){
    console.log("This is a test function")
}
/*We can call it here*/
test(); // works
