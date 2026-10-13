class Animal {
  constructor(name) {
    this.name = name;
  }  
  eats() {
    console.log(this.name +" Eats");
  }
  drinks() {
    console.log(this.name +" drinks");
  }
}  
let animal1 = new Animal("Tiger");
animal1.eats();

let animal2 = new Animal("Lion");
animal2.eats();