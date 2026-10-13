
/*

1.Built-in classes like Array, Map and others are extendable also
2.But No static inheritance in built-ins.
Normally, when one class extends another, both static and non-static methods are inherited. That was thoroughly explained in the article Static properties and methods.

But built-in classes are an exception. They don’t inherit statics from each other. 
*/


// add one more method to it (can do more)
class PowerArray extends Array {
    isEmpty() {
      return this.length === 0;
    }
  }
  
  let arr = new PowerArray(1, 2, 5, 10, 50);
  alert(arr.isEmpty()); // false
  
  let filteredArr = arr.filter(item => item >= 10);
  alert(filteredArr); // 10, 50
  alert(filteredArr.isEmpty()); // false