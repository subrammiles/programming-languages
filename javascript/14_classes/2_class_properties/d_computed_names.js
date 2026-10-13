
/*A class function can be created with computed property name */
class Animal{
    ['get'+'Sound'](){
        console.log("Bark......")
    }
    
    ['set'+'Sound'](){
        //set sound
    }
}

new Animal().getSound();


let fName = 'fullName';
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  get [fName]() {
    return `${this.firstName} ${this.lastName}`;
  }
}
let person = new Person('John', 'Doe');
console.log(person.fullName);