// Inheritance
//  class Dog : Animal          single inheritance of classes
//  virtual / override          a method subclasses may replace
//  abstract                    a class you can't instantiate / a method subclasses must implement
//  base                        call the parent's constructor or method
//  sealed                      no further inheritance
// Run: dotnet run 06_inheritance_and_interfaces/a_inheritance.cs

List<Shape> shapes = [new Circle(1), new Rectangle(2, 3), new Square(2)];
foreach (Shape s in shapes)
    Console.WriteLine(s.Describe()); // polymorphism: each object runs its own version

Shape shape = new Square(5);
Console.WriteLine($"{shape is Rectangle} {shape is Circle}"); // True False
if (shape is Square sq) Console.WriteLine($"side {sq.Side}");

abstract class Shape(string name)
{
    public string Name { get; } = name;
    public abstract double Area();
    public virtual string Describe() => $"{Name} with area {Area():F2}";
}

class Circle(double radius) : Shape("Circle")
{
    public override double Area() => Math.PI * radius * radius;
}

class Rectangle(double width, double height, string name = "Rectangle") : Shape(name)
{
    public override double Area() => width * height;
}

sealed class Square(double side) : Rectangle(side, side, "Square")
{
    public double Side { get; } = side;
    public override string Describe() => "A square! " + base.Describe();
}
