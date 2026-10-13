/*Method1*/
  const x = {
    greet() {
      console.log("hello!");
    },
  };
  const y = Object.create(x);
  console.log(y.__proto__)
  y.greet(); 

////Method 2
  const personPrototype = {
    greet() {
      console.log(`hello, my name is ${this.name}!`);
    },
  };
  
  function Person(name) {
    this.name = name;
  }
  Object.assign(Person.prototype, personPrototype);
  // or
  // Person.prototype.greet = personPrototype.greet;