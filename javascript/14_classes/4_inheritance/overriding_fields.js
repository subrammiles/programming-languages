class Animal {
    name = 'animal';
  
    constructor() {
      console.log(this.name); // (*)
    }
  }
  
  class Rabbit extends Animal {
    name = 'rabbit';
  }

  
  new Animal(); // animal
  new Rabbit(); // animal

/*Here, class Rabbit extends Animal and 
overrides the name field with its own value.

There’s no own constructor in Rabbit, 
so Animal constructor is called.

What’s interesting is that in both cases: new Animal() 
and new Rabbit(), the console in the line (*) 
shows animal. */
  class Dog extends Animal {
    name = 'Dog';
    constructor() {
        super()
        console.log(this.name); 
    }
  }

  new Dog();