class Animal{
    constructor(name){
      this.name=name;
    }
    get name(){
        return this._name;
    }
    set name(value){
        console.log("Setter called")
        this._name=value;
    }
}

let animal=new Animal("Dog");
console.log(animal.name)
console.log(animal.name="Cat")