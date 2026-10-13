// Interfaces: a contract of members a type promises to provide.
//  - a class has ONE base class but can implement MANY interfaces
//  - default interface methods (C# 8) can provide a body
//  - common built-in interfaces: IComparable<T>, IEquatable<T>, IDisposable, IEnumerable<T>
// Run: dotnet run 06_inheritance_and_interfaces/b_interfaces.cs

List<Product> products = [new("Bag", 900), new("Pen", 10), new("Book", 250)];
products.Sort(); // uses IComparable<Product>
Console.WriteLine(string.Join(", ", products.Select(p => p.Name))); // Pen, Book, Bag

IDiscountable d = products[0];
Console.WriteLine(d.DiscountedPrice(10)); // 9
Console.WriteLine(d.Describe()); // default interface method

INotifier[] channels = [new EmailNotifier(), new SmsNotifier()];
foreach (var channel in channels) channel.Send("asha", "Your order shipped");

interface IDiscountable
{
    decimal DiscountedPrice(decimal percent);
    string Describe() => $"discountable item, 10% off = {DiscountedPrice(10)}"; // default body
}

interface INotifier
{
    void Send(string to, string message);
}

class Product(string name, decimal price) : IDiscountable, IComparable<Product>
{
    public string Name { get; } = name;
    public decimal Price { get; } = price;
    public decimal DiscountedPrice(decimal percent) => Price * (100 - percent) / 100;
    public int CompareTo(Product? other) => Price.CompareTo(other?.Price ?? 0);
}

class EmailNotifier : INotifier
{
    public void Send(string to, string message) => Console.WriteLine($"email to {to}: {message}");
}

class SmsNotifier : INotifier
{
    public void Send(string to, string message) => Console.WriteLine($"sms to {to}: {message[..10]}...");
}
