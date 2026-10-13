  
  //Example2
  function Person(firstName,lastName){
      this.firstName=firstName;
      this.lastName=lastName;
  }
 /*
  Person has properties firstName and lastName
  */
  /*
  Person does not have "greet" property.We can add this using "prototype" keyword
  */
  Person.prototype.greet=function(){
      console.log("Hello, "+this.firstName+  ' '+this.lastName)
  }; 

  Person.prototype.test=1
  var john=new Person('John','Basco')
  john.greet();

  var ram=new Person('Ram','krishana')
  ram.greet();
 
  console.log(john.__proto__)
  console.log(ram.__proto__)