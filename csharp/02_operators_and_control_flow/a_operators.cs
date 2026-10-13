// Operators
//  arithmetic + - * / % ++ --   compound += -= ...
//  comparison == != < > <= >=   logical && || !   (short-circuit)
//  conditional  c ? a : b       null operators ?. ?? ??=
//  bitwise & | ^ ~ << >>        is / as for types
// Run: dotnet run 02_operators_and_control_flow/a_operators.cs

int a = 17, b = 5;
Console.WriteLine($"{a + b} {a - b} {a * b} {a / b} {a % b}"); // 22 12 85 3 2

int x = 10;
x += 5;
x++;
Console.WriteLine(x); // 16

int age = 25;
bool adult = age >= 18 && age < 60;
Console.WriteLine(adult ? "adult" : "minor"); // adult

string? name = null;
Console.WriteLine(name is not null && name.Length > 3); // False, and no NullReferenceException

Console.WriteLine($"{0b1100 & 0b1010} {0b1100 | 0b1010} {0b1100 ^ 0b1010} {1 << 4}"); // 8 14 6 16

object value = "hello";
if (value is string text) // type test + new variable
    Console.WriteLine($"a string of length {text.Length}");
var maybeNumber = value as int?; // null instead of an exception when the type doesn't match
Console.WriteLine(maybeNumber is null); // True

string s1 = "same", s2 = string.Concat("sa", "me");
Console.WriteLine($"{s1 == s2} {ReferenceEquals(s1, s2)}"); // True False -> == compares string VALUES
