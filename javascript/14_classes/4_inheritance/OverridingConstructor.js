
/*
If we are overriding the parent constructor
1.Constructors in inheriting classes(child class)
 must call super(...), 
2.And call the super(...)  before using "this".
*/
class Human{
    constructor(name){
        this.name=name;
    }
}
class Student extends Human{
    constructor(name,roll_number){
          super(name);
          this.roll_number=roll_number;  
    }
}

let student=new Student("Subbu",23);
console.log(student.name);
console.log(student.roll_number);