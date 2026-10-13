
/*
Array:List of elements(Both homogenous and hetrogenious)	
Object:Key value pair.Order not maintained.Keys are converted to strings
Maps:Key value pair.Order  maintained.Keys original datatype  is not changed
Sets:Removes duplicates
RegExp	
*/

console.log("<<<<<<<Array>>>>>>");
const a1=[1,2,3,4];
console.log(a1);
const a2=[1,"Subbu","M"];
console.log(a2);
//Another way of defining an array
const b=new Array(1,2,3,4);//using new keyword
console.log(b);


console.log("<<<<<<<Object>>>>>>")
const ob1={
    "firstName":"subbu",
    "lastName":"pampa",
    rollNumber:1
}
/*rollNumber is converted to string */
console.log(ob1)
const ob2=new Object(); //using new keyword
console.log(ob2)


console.log("<<<<<<<Map>>>>>>")
const map1=new Map();
console.log(map1)
map1.set(1,"One")
map1.set(2,"Two")
console.log(map1)
console.log(map1.get(1));


console.log("<<<<<<<Set>>>>>>")
const set2=new Set();
set2.add(1)
set2.add("apple");
set2.add("apple");
set2.add(89)
console.log(set2)

console.log("<<<<<Regular expressions>>>>")
const re1 = new RegExp('ab+c');
const re2 = /ab+c/;
