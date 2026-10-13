/*
The instanceof operator tests to see if the prototype property of a 
constructor appears anywhere in the prototype chain of an object. 
The return value is a boolean value. Its behavior can be customized with Symbol.hasInstance.
Syntax:
object instanceof constructor
*/

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car("Honda", "Accord", 1998);

console.log(auto instanceof Car);
// Expected output: true

console.log(auto instanceof Object);
// Expected output: true

class A {}
class B extends A {}

const objA=new A();
const objB=new B();

objB instanceof A;

objB instanceof B;

/*String */

const literalString = "This is a literal string";
const stringObject = new String("String created with constructor");

literalString instanceof String; // false, string primitive is not a String
stringObject instanceof String; // true

literalString instanceof Object; // false, string primitive is not an Object
stringObject instanceof Object; // true

stringObject instanceof Date; // false
