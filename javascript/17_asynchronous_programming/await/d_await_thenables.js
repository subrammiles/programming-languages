

class Thenable{
    constructor(a,b){
        this.a=a;
        this.b=b;
    }
    then(resolve,reject){
       setTimeout(()=>resolve(this.a+this.b),1000);
    }

}

async function addTwoNumbers(){
    let sum =await new Thenable(1,2);
    console.log(sum);
}

addTwoNumbers();