
/*
The setTimeout is what makes our code asynchronous.
 What the code does first in the example above 
 is to log One. Then, instead of executing the 
 setTimeout function, it logs 
 Three before it runs the setTimeout function.
*/
console.log('One');
setTimeout(() => console.log('Two'), 100);
console.log('Three');
// LOGS: 'One', 'Three', 'Two'