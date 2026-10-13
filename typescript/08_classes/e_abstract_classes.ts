
//Acts as base class for anoter class
abstract class Polygon{
    public abstract getArea():number;

    public convertToString():string{
        //child class no need to implement this methods.But in interface,it must
        return this.getArea().toString()
    }
}

class Rectangle3 extends Polygon{
    public getArea(): number {
        throw new Error("Method not implemented.");
    }
    
}