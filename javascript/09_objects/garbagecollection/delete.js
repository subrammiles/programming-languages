
/*
The delete operator removes a property from an object.
delete object.property
(or)
delete object[property]
*/
let user={
    "name":"Subbu",
    "country":"USA",
    "phone":"1234567"
}

delete user["phone"] // true
console.log(user)