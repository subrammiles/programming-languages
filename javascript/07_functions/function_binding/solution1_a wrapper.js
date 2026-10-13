
//The simplest solution is to use a 
//wrapping function
let user = {
    firstName: "John",
    sayHi() {
      alert(`Hello, ${this.firstName}!`);
    }
  };
  
  setTimeout(function() {
    user.sayHi(); // Hello, John!
  }, 1000);

  /*
  Now it works, because it receives user 
  from the outer lexical environment, 
  and then calls the method normally
  */