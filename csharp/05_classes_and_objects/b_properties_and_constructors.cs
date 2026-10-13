// Properties and constructors in depth
//  auto property          public string Name { get; set; }
//  init-only (C# 9)       public string Id { get; init; }   set only during creation
//  required (C# 11)       callers MUST set it in an object initialiser
//  field keyword (C# 14)  add logic to an auto property without writing a backing field
//  primary constructor (C# 12)  class Point(int x, int y) { ... }
//  object initialisers    new Person { Name = "Asha" }
// Run: dotnet run 05_classes_and_objects/b_properties_and_constructors.cs

var p = new Person { Name = "  Asha  ", Email = "asha@example.com", Age = 30 };
Console.WriteLine($"[{p.Name}] {p.Email} {p.Age} {p.Id}"); // [Asha] trimmed by the setter
// p.Id = "x";      // error CS8852: init-only property
// new Person();    // error CS9035: Required member 'Person.Email' must be set

try
{
    p.Age = -1;
}
catch (ArgumentOutOfRangeException e)
{
    Console.WriteLine(e.ParamName); // value
}

var point = new Point(3, 4);
Console.WriteLine($"{point.X},{point.Y} distance={point.Distance:F1}"); // 3,4 distance=5.0

var service = new Greeter("Hi");
Console.WriteLine(service.Greet("Ravi")); // Hi, Ravi!

class Person
{
    public string Id { get; init; } = Guid.NewGuid().ToString()[..8];

    public required string Email { get; init; }

    public string Name
    {
        get;
        set => field = value.Trim(); // "field" = the compiler-generated backing field (C# 14)
    } = "";

    private int _age;
    public int Age
    {
        get => _age;
        set
        {
            ArgumentOutOfRangeException.ThrowIfNegative(value);
            _age = value;
        }
    }
}

class Point(int x, int y) // primary constructor: x and y are available in the whole class
{
    public int X { get; } = x;
    public int Y { get; } = y;
    public double Distance => Math.Sqrt(X * X + Y * Y);
}

class Greeter(string greeting)
{
    public string Greet(string name) => $"{greeting}, {name}!";
}
