
/* Creating an object */
/*
There are different ways to create new objects:
1.Define and create a single object, using an object literal.
2.Define and create a single object, with the keyword new.
3.Define an object constructor, and then create objects of the constructed type.
4. Create an object using Object.create().
*/

 /*************Using Object literal*/
 let myObj1={};//Empty object
 let myObj2={
    "firstName":"subbu",
    "lastName":"gabbu"
 }//Object with key value pairs
 console.log("<<<<<<<<<<Object Literal>>>>>>>>>");
 console.log(myObj1);
 console.log(myObj2);

 /************Using new keyword */
 let myObj4=new Object();
 console.log("<<<<<<<<<<Using new keyword>>>>>>>>>");
 console.log(myObj4)


 /*********Using  create methods from object*/
 let originObject={"name":"Subbu"}
 let myObj5= Object.create(originObject);
 /*
  The Object.create() method creates a new object, using an existing object 
   as the prototype of the newly created object.
 */
 console.log("<<<<<<<<<<Using create methods from object>>>>>>>>>");
 console.log(myObj5)///This will be empty 
 console.log(myObj5.name);
                                 
/*******JavaScript Object Constructors */
console.log("<<<<<<<<<<Using Object Constractor>>>>>>>>>");
function Person(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
}

const myFather = new Person("John", "Doe", 50, "blue");
const myMother = new Person("Sally", "Rally", 48, "green");
console.log(typeof myFather);
console.log(myFather)

