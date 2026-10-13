

new Promise(function(resolve,reject){
    //Executor
    setTimeout(()=>resolve("OK"),2000);
  }).finally(()=>console.log("Stop any loaders")).then(result=>console.log(result))