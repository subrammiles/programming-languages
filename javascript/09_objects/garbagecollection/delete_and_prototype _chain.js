/*
we delete an own property of an object while a property with the same name
 is available on the prototype chain
*/

function Foo() {
    this.bar = 10;
  }
  
  Foo.prototype.bar = 42;
  
  const foo = new Foo();
  
  // foo.bar is associated with the
  // own property.
  console.log(foo.bar); // 10
  
  // Delete the own property within the
  // foo object.
  delete foo.bar; // returns true
  
  // foo.bar is still available in the
  // prototype chain.
  console.log(foo.bar); // 42
  
  // Delete the property on the prototype.
  delete Foo.prototype.bar; // returns true
  
  // The "bar" property can no longer be
  // inherited from Foo since it has been
  // deleted.
  console.log(foo.bar); // undefined