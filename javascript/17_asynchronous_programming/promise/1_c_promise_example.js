new Promise(function(resolve,reject){
    //Executor
    setTimeout(()=>resolve("OK"),2000);
  }).then(result=>console.log(result))

  new Promise(function(resolve,reject){
    //Executor
    setTimeout(()=>reject("Failed"),2000);
  }).then(result=>console.log(result)).catch(result=>console.log(result))  