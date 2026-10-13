class Animal {
    constructor(name) {
      this.name = name;
    }
  }
  
  class Dog extends Animal {
   
  }

  let dog=new Dog("Dog");

  console.log(dog instanceof Dog);
  console.log(dog instanceof Animal);