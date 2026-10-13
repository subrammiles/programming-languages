//functions in class won't work
//Class accepts A constructor, method, accessor, or property
class Animal {
    constructor() {
      console.log("I am a constructor")
    }  
    eats() {
      console.log("I am a method")
    }

    // function test() {
        
    // }
}  
let animal = new Animal();
animal.eats();