

/*
Callbacks are typically called with a this value of undefined
 (calling it directly without attaching it to any object), 
 which means if the function is non–strict, 
 the value of this is the global object (globalThis)
*/

function logThis() {
    "use strict";
    console.log(this);
  }
  
  [1, 2, 3].forEach(logThis); // undefined, undefined, undefined