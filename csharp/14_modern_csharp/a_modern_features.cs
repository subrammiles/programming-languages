// A tour of modern C# features (C# 9 -> 14), with the version that introduced each.
// Run: dotnet run 14_modern_csharp/a_modern_features.cs

// C# 9: records, init-only properties, top-level statements (this whole file), target-typed new
Point p = new(1, 2);
Console.WriteLine(p with { Y = 5 }); // Point { X = 1, Y = 5 }

// C# 10: file-scoped namespaces, global usings, record structs, constant interpolated strings
const string Product = "Pen";
const string Label = $"Product: {Product}";
Console.WriteLine(Label);

// C# 11: raw string literals, list patterns, required members, generic math, UTF-8 literals
int[] values = [1, 2, 3];
Console.WriteLine(values is [1, .., 3] ? "list pattern matched" : "no match");
ReadOnlySpan<byte> utf8 = "héllo"u8;
Console.WriteLine($"\"héllo\" is {utf8.Length} UTF-8 bytes"); // 6

// C# 12: collection expressions, primary constructors, spread, default lambda parameters, alias any type
int[] more = [.. values, 4, 5];
List<string> names = ["Asha", "Ravi"];
Console.WriteLine($"{more.Length} {names.Count}"); // 5 2
var service = new Greeter("Hi");
Console.WriteLine(service.Greet("Meena"));

// C# 13: params collections, the Lock type, \e escape, ref struct interfaces
Console.WriteLine(Total(1, 2, 3)); // 6 -> params on a span, no array allocated
Console.WriteLine(Total([4, 5])); // 9

// C# 14: extension members, the field keyword, null-conditional assignment,
//        nameof with unbound generics, implicit span conversions, partial constructors
Customer? customer = new();
customer?.Order = new Order(); // null-conditional ASSIGNMENT: skipped when customer is null
Customer? nobody = null;
nobody?.Order = new Order(); // nothing happens, no exception
Console.WriteLine(customer?.Order is not null); // True
Console.WriteLine(nameof(List<>)); // List
Console.WriteLine("  ".IsBlank); // True -> extension property

static int Total(params ReadOnlySpan<int> numbers)
{
    int sum = 0;
    foreach (int n in numbers) sum += n;
    return sum;
}

record Point(int X, int Y);

class Greeter(string greeting)
{
    public string Greet(string name) => $"{greeting}, {name}!";
}

class Customer
{
    public Order? Order { get; set; }
}

class Order;

static class Extensions
{
    extension(string s)
    {
        public bool IsBlank => string.IsNullOrWhiteSpace(s);
    }
}
