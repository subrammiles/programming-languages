
let user1 = {
    name: "John",
    age: 30,
  
    sayHi() {
      // "this" is the "current object"
      alert(this.name);
    }
  
  };
  //We are refering to current object
  
  user.sayHi(); // John
  //Technically, it’s also possible to access the object without this, by referencing it via the outer variable:
  let user2 = {
    name: "John",
    age: 30,
  
    sayHi() {
      alert(user.name); // "user" instead of "this"
    }
  
  };