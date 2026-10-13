

let x={"myname":"Trump","age":20};

console.log("<<<<<<<<<<<Using the array of keys>>>>>>>>>>>")
/*Using array of keys */
const keysArray = Object.getOwnPropertyNames(x);
for(let i=0;i<keysArray.length;i++){
    console.log(x[keysArray[i]])
}
/*Using array of keys */
const keysArray2 = Object.keys(x);
for(let i=0;i<keysArray2.length;i++){
    console.log(x[keysArray2[i]])
}

console.log("<<<<<<<<<<<For in>>>>>>>>>>>")
/*Using for in loop */
for(let key in x){
    console.log(x[key])
}

// ///for of
// ///Using for of
// console.log("<<<<<<<<<<<For of>>>>>>>>>>>")
// for (const key of x) {
//     console.log(key)
//  }

