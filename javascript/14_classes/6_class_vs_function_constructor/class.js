
/*We can achieve the Student1 with classes  */
'use strict'
class Student1{
    constructor(name){
        this.name=name;
    }
    printStudent=function(){
        console.log(this.name)
    }
}

var s1=new Student1("Subbu2");
s1.printStudent()


