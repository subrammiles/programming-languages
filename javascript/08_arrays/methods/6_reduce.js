
/*Reduce travels all the elements a 
applys some opeation and resuces to a value.
This function gives a single value 
*/
let numbers1 = [0, 1, 2, 3, 4];
var sum = numbers1.reduce(myFunction);
function myFunction(total, value, index, array) {
  return total + value;
}
console.log(sum) //0+1+2+3+4=10
