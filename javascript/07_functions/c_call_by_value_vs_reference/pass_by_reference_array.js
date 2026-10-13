
let myArray1=[1,2,3]
function changeArray1(a){
 a[0]="apple"
}
changeArray1(myArray1)
console.log(myArray1)

let myArray2=[1,2,3]
function changeArray2(a){
 let b=a;
 b={"test":"modified"}
}
changeArray2(myArray2)
console.log(myArray2) //[1,2,3]

let myArray3=[1,2,3]
function changeArray3(a){
 let b=a;
 b[0]="Apple"
}
changeArray3(myArray2)
console.log(myArray2) //["Apple",2,3]

