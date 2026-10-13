class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name}  eats.`);
  }
  sleep() {
    console.log(`${this.name} sleep`);
  }
}

class Dog extends Animal {
  makeSound() {
    console.log(`${this.name}  makes Bow Bow!`);
  }
}

console.log(Dog.prototype);

let dog = new Dog("Dog");
dog.eat(); 
dog.sleep();
dog.makeSound(); 




