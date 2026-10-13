// Pattern matching (C# 7 to 11) in "is" expressions and switch expressions
//  type          case int n
//  constant      case null, case 0
//  relational    < 0, >= 100           logical: and, or, not
//  property      { Status: "active", Age: > 18 }
//  positional    (x, y) for records and tuples
//  list (C# 11)  [first, .., last],  [_, _]
//  var / discard  var x,  _
// Run: dotnet run 11_pattern_matching/a_pattern_matching.cs

static string Classify(object? value) => value switch
{
    null => "null",
    int n when n < 0 => "negative int",
    int n => $"int {n}",
    string { Length: 0 } => "empty string",
    string s => $"string \"{s}\"",
    int[] { Length: > 3 } => "long int array",
    IEnumerable<int> seq => $"sequence of {seq.Count()} ints",
    _ => $"other: {value.GetType().Name}",
};

static decimal Fee(Order order) => order switch
{
    { Total: > 10_000 } => 0, // big orders ship free
    { Customer.IsPremium: true } => 0,
    { Country: "IN" or "LK" } => 50,
    _ => 200,
};

static string Quadrant(Point p) => p switch
{
    (0, 0) => "origin",
    (> 0, > 0) => "first",
    (< 0, > 0) => "second",
    (_, 0) or (0, _) => "on an axis",
    _ => "third or fourth",
};

static string DescribeList(int[] items) => items switch
{
    [] => "empty",
    [var only] => $"one item: {only}",
    [var first, .., var last] when first == last => "starts and ends the same",
    [1, 2, ..] => "starts with 1, 2",
    [.., var last] => $"ends with {last}",
};

Console.WriteLine(Classify(-5)); // negative int
Console.WriteLine(Classify(42)); // int 42
Console.WriteLine(Classify("")); // empty string
Console.WriteLine(Classify(new[] { 1, 2, 3, 4 })); // long int array
Console.WriteLine(Classify(new List<int> { 1, 2 })); // sequence of 2 ints
Console.WriteLine(Classify(3.5)); // other: Double

Console.WriteLine(Fee(new Order(20_000, "US", new Customer(false)))); // 0
Console.WriteLine(Fee(new Order(500, "US", new Customer(true)))); // 0
Console.WriteLine(Fee(new Order(500, "IN", new Customer(false)))); // 50
Console.WriteLine(Fee(new Order(500, "US", new Customer(false)))); // 200

Console.WriteLine($"{Quadrant(new(0, 0))} {Quadrant(new(2, 3))} {Quadrant(new(-1, 4))} {Quadrant(new(5, 0))}");
Console.WriteLine($"{DescribeList([])} | {DescribeList([7])} | {DescribeList([3, 9, 3])} | {DescribeList([1, 2, 9])} | {DescribeList([5, 6])}");

if (new Point(3, 4) is { X: > 0 } p && p.Y is >= 0 and <= 10)
    Console.WriteLine($"({p.X},{p.Y}) is in range");

record Customer(bool IsPremium);
record Order(decimal Total, string Country, Customer Customer);
record Point(int X, int Y);
