
/*
The new operator lets developers create an instance of a user-defined object type or of one of the built-in object types that has a constructor function.
*/

 /*
 new constructor
new constructor()
new constructor(arg1)
new constructor(arg1, arg2)
new constructor(arg1, arg2, ... argN)
 */
class Animal {
    constructor() {
      console.log("I am a constructor")
    }  
    eats() {
      console.log("I am a method")
    }
}  
let animal = new Animal();
animal.eats();