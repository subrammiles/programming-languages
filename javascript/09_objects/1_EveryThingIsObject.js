/*Every thing is an object in JS except primitive values*/

console.log("<<<<<Number>>>>>>")
let a1=11;
let a2=new Number(11);
/*a1 is not an object.It is an primitive */
/*but a2 is an object.a1 is a primitive */
console.log(typeof a1) //number
console.log(typeof a2) //object

console.log("<<<<<Other>>>>>>")
let b2=new String("Hello");
let b3=new Boolean(false);
console.log(typeof b2);
console.log(typeof b3);
console.log(typeof b4);


console.log("<<<<<Array>>>>>>")
var myarray1=[1,2,3,4,5];
/*d is an object */
console.log(typeof myarray1) //object


console.log("<<<<  Function >>>>>>")
var myFUnce1=function(){
    console.log("Hello")
};
console.log(typeof myFUnce1)//prints function 

console.log("<<<<  Objects >>>>>>")
/*e is an object */
var obj1={
    "One":1,
    "two":2,
    "three":3
}
/*f is an object */
var obj2={
    "myint":1,
    "mystring":"dgfdg",
    "myarray":[1,2,34],
    "myfunc":function(){
        console.log("meow")
    },
    "myInnerObject":{
        "k1":1,"k2":2
    }
}
console.log(typeof obj1);
console.log(typeof obj2);
