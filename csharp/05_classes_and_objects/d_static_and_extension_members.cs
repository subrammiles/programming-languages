// static members, static classes, and extension members
//  static field/method   belongs to the type, shared by all instances
//  static class          only static members (e.g. Math, File); can't be instantiated
//  extension methods     add methods to existing types without changing them (used by LINQ)
//  extension blocks (C# 14)  also add extension PROPERTIES and static members
// Run: dotnet run 05_classes_and_objects/d_static_and_extension_members.cs

Console.WriteLine(Temperature.ToFahrenheit(100)); // 212
Console.WriteLine("hello world".WordCount()); // 2 -> extension method
Console.WriteLine("   ".IsBlank); // True -> extension property (C# 14)
Console.WriteLine(string.Repeat("ab", 3)); // ababab -> static extension member (C# 14)
Console.WriteLine(new[] { 3, 1, 2 }.SecondLargest()); // 2

static class Temperature
{
    public const double FreezingF = 32;
    public static double ToFahrenheit(double celsius) => celsius * 9 / 5 + FreezingF;
}

static class StringExtensions
{
    public static int WordCount(this string text) => // classic extension method syntax
        text.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;

    extension(string s) // C# 14 extension block
    {
        public bool IsBlank => string.IsNullOrWhiteSpace(s);

        public static string Repeat(string text, int times) => string.Concat(Enumerable.Repeat(text, times));
    }

    extension(int[] numbers)
    {
        public int SecondLargest() => numbers.OrderDescending().Skip(1).First();
    }
}
