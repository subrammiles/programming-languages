
/*
When a function is used as a constructor 
(with the new keyword), 
its this is bound to the new object being constructed, 
no matter which object the constructor function is
 accessed on. The value of this becomes the value of the 
 new expression unless the constructor returns another 
 non–primitive value.
*/

function C() {
    this.a = 37;
  }
  
  let o = new C();
  console.log(o.a); // 37
  
  function C2() {
    this.a = 37;
    return { a: 38 };
  }
  
  o = new C2();
  console.log(o.a); // 38