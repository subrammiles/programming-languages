/*
Closure is the ability of a function 
to use variables or other information 
outside its local scope. 
*/

const friendlyFunction = (function () {
    let greetCount = 0;
    return function () {
      console.log(`Hello ${greetCount}x`);
      return greetCount++;
    };
  })();
  
  friendlyFunction();
  friendlyFunction();
  friendlyFunction();
  