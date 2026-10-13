//////////Example 2:Passing some data -///////////////
//////greet adds two numbers and call the callback once addition is done
function greet(a,b,callback){
    /*We will do some operations*/
    additionResult=a+b;
    /*After completing our operation we call a callback indicating operation is done */
    callback(additionResult)
}
///We need to pass a function to the greet 
callbackFunction=function(result){
    console.log("The call back is invoked with sum !!!!");
    console.log("Addition of two numbers is " +result);
}
greet(1,2,callbackFunction)







