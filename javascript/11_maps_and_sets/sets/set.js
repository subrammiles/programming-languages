

let set1=new Set();
set1.add("a");
set1.add("b");
set1.add("a");
console.log(set1)
const set2 = new Set(["a","b","c"]);
console.log(set2)

set1.forEach((x)=>{
    console.log(x)
});