a=1;
b=2;

let promise=new Promise(function(resolve,reject){   
    if(a==b){
        resolve();
    }else{
        reject();
    }   
});

handleA=function(){
    console.log("Handling A")
}

handleB=function(){
    console.log("Handling B")
}

handleC=function(){
    console.log("Handling Error")
}

promise.then(handleA).then(handleB).catch(handleC);


