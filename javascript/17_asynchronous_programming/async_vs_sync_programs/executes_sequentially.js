
/*
In the below example, the first line of code, 
One, will be logged first, followed by the
 second line, Two, and the third line, Three. 
It’s easy to see that the code works 
sequentially; each line of code waits for 
the former to be completed before it executes.
*/
console.log('One');
console.log('Two');
console.log('Three');
// LOGS: 'One', 'Two', 'Three'