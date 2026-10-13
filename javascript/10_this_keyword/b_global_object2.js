

/*If the function being referenced is a regular function, “this” 
references the global object. If the function that is being referenced is a
 method in an object, “this” references the object itself. */
function test(){

console.log(this) // 
}

test();