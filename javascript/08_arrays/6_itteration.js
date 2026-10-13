
const a=[100,200,300,400,500];
a["id"]="numbersOF100"
///Using for of
console.log("<<<<<for of>>>>>>")
//For of iterated over the array values
for (const x of a) {
    console.log(x)
}

console.log("<<<<<for in>>>>>>")
//For in  iterated over the array keys
for (const x in a) {
    console.log(x)
}


//foreach loop need a callback function
console.log("<<<<<for each>>>>>>")
a.forEach(function(value,index,array){
  console.log(String(index)+" : "+String(value) );
});