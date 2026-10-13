

function Student1(name){
        this.name=name;
}
Student1.prototype.printStudent=function(){
    console.log(this.name)
}
var s1=new Student1("Subbu");
s1.printStudent()

/*We created a functioal constractor Student1 and this.name is objecti of the function.To that
we assined functional argument.
2.Using prototype ,we added a "printStudent" method to the Student1
*/

//Same think can be done with classses
