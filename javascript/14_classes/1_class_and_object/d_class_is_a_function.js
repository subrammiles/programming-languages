// class Animal {
//     constructor() {
//       console.log("I am a constructor")
//     }
//     eats() {
//       console.log("I am a method")
//     }
// }

function Animal() {
  console.log("I am a constructor");
}

//Now you can also add a method to your class
Animal.prototype.eats = () => {
  console.log("I am a method");
};

let animal = new Animal();
animal.eats();

/*A function or Class can start with a small letter also
but it is not recommended
*/