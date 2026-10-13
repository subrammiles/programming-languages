
//Objects are called by reference.How to copy then?
const animal1={name:"Dog"}
const animal2={...animal1}
console.log("<<<<<Before Change>>>>>.")
console.log(animal1)
console.log(animal2)
console.log("<<<<<After Change>>>>>.")
animal1.name="Frog"
console.log(animal1)
console.log(animal2)
 
