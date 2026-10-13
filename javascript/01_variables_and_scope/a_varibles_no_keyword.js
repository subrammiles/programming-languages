/*Without var and let keyword*/
s = 2; 
// If you do not add any keyword ,var or let or const ,it is a global.
// However ,a value must be assigned to it
console.log(s)

/*
s;
s=2
//The above declaration gives ERROR
*/


//////////////////////////////////////////////////////
/*You can also define a variable inside a function 
without any keywords
*/
function myFunc(){
    myMessage="Good Morning Mr.Subrahmanyam"
}
myFunc(); //This function must be called to make the myMessage global
console.log(myMessage) //After calling the function myMessage becomes global



     




