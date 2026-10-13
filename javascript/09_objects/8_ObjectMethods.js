
//We can add functions inside a object
//You access an object method with the following syntax:
//objectName.methodName()
var student={
    first_name:"Trump",
    last_name:"Donald Obuma",
    roll_number:12,
    grade: function(){
        console.log("Grade not at availble...")
    }
}
student.grade();
//Adding a Method to an Object
student.total_marks=function(){
    return 350;
}
console.log(student.total_marks())

