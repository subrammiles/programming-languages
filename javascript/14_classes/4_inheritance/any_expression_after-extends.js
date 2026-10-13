/*
Class syntax allows to specify not just a class, 
but any expression after extends.
*/

function f(phrase) {
    return class {
      sayHi() { alert(phrase); }
    };
  }
  
class User extends f("Hello") {

}
  
new User().sayHi(); // Hello

/*
Here class User inherits from the result of f("Hello").
*/