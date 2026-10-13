// Records and structs
//  record (C# 9)      a class made for DATA: value equality, ToString, with-expressions, immutability
//  record struct      the same, as a value type
//  struct             a value type: copied on assignment, lives inline (no heap object)
//  readonly struct    all fields read-only
// Run: dotnet run 05_classes_and_objects/c_records_and_structs.cs

var a = new Product("Pen", 10m);
var b = new Product("Pen", 10m);
Console.WriteLine(a == b); // True -> records compare VALUES (classes compare references)
Console.WriteLine(a); // Product { Name = Pen, Price = 10 }

var discounted = a with { Price = 8m }; // a copy with one change
Console.WriteLine($"{discounted.Price} {a.Price}"); // 8 10
var (name, price) = a; // records deconstruct
Console.WriteLine($"{name} costs {price}");

var p1 = new Coordinate(1, 2);
var p2 = p1; // a COPY (value type)
p2.X = 100;
Console.WriteLine($"{p1.X} {p2.X}"); // 1 100

Money m = new(500, "INR");
Console.WriteLine(m + new Money(250, "INR")); // Money { Amount = 750, Currency = INR }

public record Product(string Name, decimal Price);

public struct Coordinate(int x, int y)
{
    public int X = x;
    public int Y = y;
}

public readonly record struct Money(decimal Amount, string Currency)
{
    public static Money operator +(Money left, Money right)
    {
        if (left.Currency != right.Currency) throw new InvalidOperationException("currency mismatch");
        return left with { Amount = left.Amount + right.Amount };
    }
}
