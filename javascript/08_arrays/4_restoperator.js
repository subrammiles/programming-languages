
//Rest parameters
//The rest parameter syntax allows a function to accept an indefinite 
//number of arguments as an array, providing a way to represent variadic functions 
//in JavaScript.


//This function adds sum of passed arguments
function sum(...args) {
    let sum = 0;
    for (const arg of args) {
        sum += arg;
    }
    return sum;
  }
console.log(sum(1, 2, 3));
  