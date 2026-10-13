function Student() {
    this.name = 'John';
    this.gender = 'M';
}

var studObj = new Student();

console.log(Student.prototype); // object
console.log(studObj.prototype); // undefined
console.log(studObj.__proto__); // object

console.log(typeof Student.prototype); // object
console.log(typeof studObj.__proto__); // object

console.log(Student.prototype === studObj.__proto__ ); // true

/*
As you can see in the above example, 
Function's prototype property can be accessed 
using <function-name>.prototype. 
However, an object (instance) does not expose 
prototype property, instead you can 
access it using __proto__.
*/