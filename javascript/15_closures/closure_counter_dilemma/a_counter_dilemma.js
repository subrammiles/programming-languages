
/*Suppose you want to use a variable for 
counting something, and you want this 
counter to be available to all functions.

You could use a global variable, and a 
function to increase the counter: */

let counter=0;

function add(){
  counter=counter+1;
}

// Call add() 3 times
add();
add();
add();
///output 3
///Now problem with this approch is what if
//some other code change the "counter" value