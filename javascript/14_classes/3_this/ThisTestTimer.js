
class Animal{
    constructor(name){
        this.name=name;
    }
    printAnimal(){
        console.log(this.name);
    }
}

let animal=new Animal("Dog");
setTimeout(animal.printAnimal,2000);//undefined