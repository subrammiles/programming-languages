

//Properties and methods can be added to a constructor using a prototype:


function User() {
    this.name = 'Bob';
}

let user1 = new User();
let user2 = new User();

//Adding property to constructor using prototype
User.prototype.age = 25;
User.prototype.sex="N";
console.log(user1); 
console.log(user2); 
console.log(user1.age); 
console.log(user1.sex); 


