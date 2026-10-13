// Strings are IMMUTABLE sequences of UTF-16 characters. Methods return NEW strings.
//  interpolation $"..."   verbatim @"C:\path"   raw literals """ ... """ (C# 11)
//  StringBuilder for building text in a loop
// Run: dotnet run 01_variables_and_types/d_strings.cs

using System.Text;

string s = "  Hello, C# World  ";
string t = s.Trim();
Console.WriteLine(t.ToUpper()); // HELLO, C# WORLD
Console.WriteLine($"{t.Length} {t.Contains("C#")} {t.StartsWith("Hello")} {t.IndexOf("World")}"); // 15 True True 10
Console.WriteLine(t.Replace("World", "Developer"));
Console.WriteLine(t[7..9]); // C#  -> a range (C# 8)
Console.WriteLine(t[^5..]); // World -> ^5 means "5 from the end"
Console.WriteLine(string.Join(" | ", "a,b,,c".Split(',', StringSplitOptions.RemoveEmptyEntries))); // a | b | c
Console.WriteLine($"{"apple".CompareTo("banana")} {string.Equals("Go", "GO", StringComparison.OrdinalIgnoreCase)}"); // -1 True
Console.WriteLine($"{string.IsNullOrWhiteSpace("   ")} {"ab".PadLeft(5, '*')} {new string('-', 10)}"); // True ***ab ----------

decimal price = 1234.5m;
DateTime day = new(2026, 10, 13);
Console.WriteLine($"{price:C2} | {price:N2} | {price,12:F1}| {day:dd MMM yyyy}"); // currency, number, width, date
Console.WriteLine(@"C:\Users\subbu\notes.txt"); // verbatim: backslashes are literal

string json = """
    {
      "name": "Subbu",
      "language": "C#"
    }
    """; // raw string literal: no escaping, indentation trimmed
Console.WriteLine(json);

var sb = new StringBuilder();
for (int i = 1; i <= 3; i++) sb.Append($"line {i}; ");
Console.WriteLine(sb.ToString().TrimEnd());
