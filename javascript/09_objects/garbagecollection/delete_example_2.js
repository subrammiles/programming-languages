

let user={
    "name":"Subbu",
    "country":"USA",
    "phone":"1234567"
}

//Even when the property does not exist, delete returns "true".
delete user["email"]
console.log(user)