class Animal {
  constructor() {
  }
  makeSound() {
    console.log("Animal  makes sound");
  }
}

class Dog extends Animal {
  makeSound() {
    super.makeSound();
  }
}
class Cat extends Animal {
  makeSound() {
    console.log("Cats makes mew");
 }
}


let dog = new Dog();
dog.makeSound(); 

let cat = new Cat();
cat.makeSound(); 

