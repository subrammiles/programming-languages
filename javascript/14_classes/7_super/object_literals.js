
const obj1 = {
    method1() {
      console.log("method 1");
    },
  };
  
  const obj2 = {
    method2() {
      super.method1();
    },
  };
  
  Object.setPrototypeOf(obj2, obj1);
  obj2.method2(); // Logs "method 1"

  /*Super can also be used in the object initializer notation. In this example, two objects define a method. 
  //In the second object, super calls the first object's method. This works with the help of Object.setPrototypeOf() with which we are able to set the prototype of obj2 to obj1, so that super is able to find method1 on obj1. */