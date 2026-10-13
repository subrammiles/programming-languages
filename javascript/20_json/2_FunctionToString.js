const person = {
  name: "Trump",
  city: "New York",
  age: function () {return 30;},
  marks:[23,45,67,34]
};

let myString = JSON.stringify(person);
console.log(myString);
console.log(typeof myString)

//Functions are not stringifyed.This can be "fixed" if you convert the functions into strings before stringifying.
person.age=person.age.toString();
let myString2 = JSON.stringify(person);
console.log(myString2);


