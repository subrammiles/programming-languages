
/*Spread operators copyes the one object  elemenmts into other */
const person={
    name:'Subbu'
}
console.log(person)
const newPerson={
    ...person,
    age:2
}

console.log(newPerson)

//Withour spread
const newPerson2={ person,
    age:2};
console.log(newPerson2)//It won't copy coreectly