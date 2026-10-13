/*
When passing object methods as callbacks, for instance to setTimeout, there’s a known problem: "losing this".
*/

/*Once a method is passed somewhere separately from the 
object – this is lost */
let user = {
    firstName: "John",
    sayHi() {
      alert(`Hello, ${this.firstName}!`);
    }
  };
  
  let myfunc=user.sayHi
  setTimeout(myfunc, 1000); // Hello, undefined!

  /*Reason for this
  1.In browsers, it sets this=window
  So for this.firstName it tries to get window.firstName, which does not exist.
  2.In Node JS,this becomes the timer object
  */