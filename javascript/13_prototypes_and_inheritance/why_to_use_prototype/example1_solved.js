

function Employee() {
    this.name = 'Arun';
    this.role = 'QA';
}
Employee.prototype.salary = 15;
var empObj1 = new Employee();
empObj1.salary = 30000;
console.log(empObj1.salary); // 15

var empObj2 = new Employee();
console.log(empObj2.salary); // undefined

/*
As we see in the above example, the salary variable adds to the empObj1. But when we try to access the salary variable using the empObj2 object, it doesn't have the salary variable because the salary variable is defined only in the empObj1 object.

Now comes the question, Can there be a way that the new variable can be added to the function itself so as it is accessible to all the objects created using the function?

The answer to this question is the use of a prototype. 
*/