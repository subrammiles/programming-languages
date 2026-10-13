function Person(firstName,lastName,age){
    this.fs=firstName;
    this.ls=lastName;
    this.age=age;
 }

console.log("<<<<ProtoType>>>>")
console.log(Person.prototype); // This is printed {constructor: ƒ}
Person.prototype.country="India"
 let p1=new Person("Subbu","P",20);
 let p2=new Person("Gubbu","Y",22);

 console.log(p1)
 console.log(p1.country)
 