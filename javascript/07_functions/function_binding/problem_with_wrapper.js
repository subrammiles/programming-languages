
/*What if before setTimeout triggers 
(there’s one second delay!) user changes value? Then, suddenly, 
it will call the wrong object! */

let user = {
    firstName: "John",
    sayHi() {
      alert(`Hello, ${this.firstName}!`);
    }
  };
  
  setTimeout(() => user.sayHi(), 1000);
  
  // ...the value of user changes within 1 second
  user = {
    sayHi() { console.log("Another user in setTimeout!"); }
  };
  
  // Another user in setTimeout!