/*
Syntax:
var promise = new Promise(function(resolve, reject){
    //do something=Executor

});
We will pass anonimose function to Promise constracture
*/

let promise =new Promise(function(resolve,reject){
  //Executor
  setTimeout(()=>resolve("OK"),2000);
})

//Consuming Promise
success=function(){
    console.log("Promiss success")
}
fail=function(){
    console.log("Promise Fail")
}
promise.then(success).catch(fail);



