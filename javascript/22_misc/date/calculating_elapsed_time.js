

// Using Date objects
const start = Date.now();

// The event to time goes here:
doSomethingForALongTime();
const end = Date.now();
const elapsed = end - start; // elapsed time in milliseconds



// // Using built-in methods
// const start = new Date();

// // The event to time goes here:
// doSomethingForALongTime();
// const end = new Date();
// const elapsed = end.getTime() - start.getTime(); // elapsed time in milliseconds