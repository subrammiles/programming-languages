///Tuple is an array but Length of the tuple is fixed
//we need to define the data type initially

//Tuples are typed arrays
let myTuple:[number,boolean,string];
myTuple=[5,false,"subbu"]

console.log(myTuple)
/*It accepts new element but typ eof the 
newly adding element is undefined
*/
myTuple.push("New element")
console.log(myTuple)
//myTuple[0]="subbu"
// myTuple[3]="subbu"
