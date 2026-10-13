
let promise =new Promise(function(resolve,reject){
  //Executor
  setTimeout(()=>reject("OK"),2000);
})

success=function(){
    console.log("Promiss success")
}
fail=function(){
    console.log("Promise Fail")
}
promise.then(success).catch(fail);


////Another example
//Try to use Error object for rejections


new Promise(function(resolve, reject) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});


