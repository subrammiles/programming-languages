

/*Hoisting of function:Function declarations*/
/*The function myfunc1 has been hoisted */

// We can call it here
myfunc1(); // Works

// Yet, it is defined down there.
function myfunc1(){
    console.log("Function called successfully....")
}

// We can call it again
myfunc1(); // Works


/*Also, it hoisted through a return statement*/
myfunc2(); // Works
return;
function myfunc2(){}
