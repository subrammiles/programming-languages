a=1;

new Promise(function(resolve,reject){
    setTimeout(()=>resolve(a),1000)
}).then(function(data){
    return new Thenable(data);
}).then(function(data){
    return new Thenable(data);
}).then(function(data){
    console.log(data)
}).catch(function(data){
    
})

class Thenable{
    constructor(sum){
        this.sum=sum;
    }
    then(resolve,reject){
        setTimeout(()=>resolve(this.sum+1),2000)
    }
}