
/*Map travels the all the elements and returan a new array
without modifying the original array.
You can apply some operation on every element of array
*/

let numbers1 = [1, 1, 1, 1, 1];
let numbers2 = numbers1.map(multiplyEveryElementWith0);

function addOneToEveryElement(value, index, array) {
  return value +1;
}

function multiplyEveryElementWith0(value, index, array) {
  return value*0;
}


console.log(numbers2)


