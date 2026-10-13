//The filter() method creates a new array 
//with array elements that pass a test

let numbers = [75, 25, 18, 32, 5];

var numbers2 = numbers.filter(getAgeToVote);

function getAgeToVote(value, index, array) {
  return value > 18;
}
console.log(numbers2)
