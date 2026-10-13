/*
Classes in TypeScript: like JavaScript classes, plus types for fields and methods.
With "strict" on, every field must be initialised: in its declaration or in the constructor.
*/

class Person {
  name: string;
  age = 0; // type inferred from the initial value

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hi, I'm ${this.name} and I'm ${this.age}`;
  }
}

const person = new Person("Subbu");
person.age = 30;
console.log(person.greet()); // Hi, I'm Subbu and I'm 30
// class Broken { name: string } // error TS2564: Property 'name' has no initializer
