
///Objects are mutable: They are addressed by reference, not by value.
const person={name:"Subbu"}
const x=person;
console.log("<<<<<Before Change>>>>>.")
console.log(person)
console.log(x)
console.log("<<<<<After Change>>>>>.")
person.name="Gabbu"
/*The will effect person and x values as x points to pointe of "person"*/
console.log(person)
console.log(x)


