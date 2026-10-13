interface Shape{
    getArea:()=>number;
}
class Rectangle implements Shape{
   
    getArea():number{
       return 20;
    };
    
}
class Sqare extends Rectangle{
    //child Class can override therir parent class methods
    override getArea():number{
        return 20;
     };
}

//class extends another class and can implements interfaces