// Type conversions
//  implicit  int -> long -> double (no data loss): happens automatically
//  explicit  (int)3.9 -> 3  a cast; may lose data
//  parsing   int.Parse("42") throws on bad input; int.TryParse is safer
//  Convert   Convert.ToInt32(3.5) rounds (to even); ToString formats
// Run: dotnet run 01_variables_and_types/c_type_conversion.cs

int i = 42;
long l = i; // implicit
double dbl = i; // implicit
int back = (int)9.99; // explicit: truncates
Console.WriteLine($"{l} {dbl} {back}"); // 42 42 9

Console.WriteLine(int.Parse("123") + 1); // 124
Console.WriteLine(double.Parse("3.5", System.Globalization.CultureInfo.InvariantCulture)); // 3.5

foreach (string input in new[] { "42", "abc", "" })
{
    if (int.TryParse(input, out int value))
        Console.WriteLine($"\"{input}\" -> {value}");
    else
        Console.WriteLine($"\"{input}\" is not a number");
}

try
{
    int.Parse("abc");
}
catch (FormatException e)
{
    Console.WriteLine($"FormatException: {e.Message}");
}

Console.WriteLine($"{Convert.ToInt32(2.5)} {Convert.ToInt32(3.5)} {Math.Round(2.5, MidpointRounding.AwayFromZero)}"); // 2 4 3
Console.WriteLine($"{123.456.ToString("F1")} {0.256.ToString("P0")} {1234567.ToString("N0")}"); // 123.5 26% 1,234,567
Console.WriteLine(string.Join(",", "1,2,3".Split(',').Select(int.Parse).Select(n => n * 10))); // 10,20,30
