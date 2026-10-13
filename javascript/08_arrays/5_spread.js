
/*Spread operators copies the one array elements into other */
const numbers=[1,2,3]
console.log(numbers)
const newNumbers=[...numbers,4];
console.log(newNumbers)

//Without spread
const newNumbers2=[numbers,4];
console.log(newNumbers2)//It won't copy coreectly