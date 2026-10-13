
//////greet adds two numbers and call the callback once addition is done
let additionResult;

function greet(a,b,callback){
    /*We will do some operations*/
    additionResult=a+b;
    /*After completing our operation we call a callback indicating operation is done */
    callback()
}
///We need to pass a function to the greet 
callbackFunction=function(){
    console.log("The call back is invoked!!!!");
    console.log("Addition of two numbers is " +additionResult);
}
greet(1,2,callbackFunction)




