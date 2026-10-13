
/*
1.for..of and for..in statements iterate over lists
(Like arrays ,sets,object keys(but not values)).
2.for..in returns a list of keys on the object being iterated.
3. for..of returns a list of values of of the object being iterated.
*/

console.log("<<<<<<<<<Test1>>>>>>>")
let list1 = [60, 333, 10,780];
for (let i in list1) {
    //prinst index
   console.log(i); // 0, 1, 2, 3
}


for (let i of list1) {
   console.log(i); 
}

console.log("<<<<<<<<<Test2>>>>>>>")
let set1 = new Set([2, 4, 6]);
set1["numberType"] = "even";
let set2 = new Set([2, 3, 5]);
set2["numberType"] = "odd";

console.log(set1);
console.log(set2);
console.log("..Set1..")
for (let item in set1) {
   console.log(item); // "numberType"
}
for (let item of set1) {
    console.log(item); // 2,4,6
}

console.log("..Set2..")
for (let item in set2) {
   console.log(item); // "numberType"
}
for (let item of set2) {
    console.log(item); // 2,3,5
}

console.log("<<<<<<<Set 3>>>>>>>>");

let myobj={"a":1,"b":2};

for(const item in myobj){
    console.log(item)
}

//We can not iterate over the object values 
// for(const item of myobj){
//     console.log(item)
// }

//You can use like this
for(const item in myobj){
    console.log(myobj[item])
}

