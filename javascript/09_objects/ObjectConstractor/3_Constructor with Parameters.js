//Constructor
function User (name, age) {
    this.name = name;
    this.age = age;
}

var user1 = new User('Bob', 25);
var user2 = new User('Alice', 27);
//In the above example, arguments are passed to the constructor during object creation.
// This allows each object to have different property values.