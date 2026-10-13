// null and nullable types
//  Value types can't be null unless you add ?:  int? maybe = null;   (Nullable<int>)
//  Reference types: with "nullable reference types" (on by default in new projects and
//  file-based apps) string can't hold null, string? can, and the compiler warns about mistakes.
//  ?. null-conditional   ?? null-coalescing   ??= assign if null   ! "I know it's not null"
// Run: dotnet run 01_variables_and_types/e_nullable.cs

int? maybeAge = null;
Console.WriteLine(maybeAge.HasValue); // False
Console.WriteLine(maybeAge ?? 18); // 18
maybeAge = 30;
Console.WriteLine(maybeAge.Value); // 30

string? nickname = null;
Console.WriteLine(nickname?.Length); // (empty: null)
Console.WriteLine(nickname?.ToUpper() ?? "no nickname"); // no nickname
// Console.WriteLine(nickname.Length); // warning CS8602: Dereference of a possibly null reference

nickname ??= "Subbu"; // only assigns when null
Console.WriteLine(nickname.Length); // 5 -> the compiler knows it's not null now

string Describe(string? text)
{
    if (text is null) return "nothing";
    return $"{text.Length} characters"; // narrowed: text is string here
}
Console.WriteLine($"{Describe(null)}, {Describe("hello")}");
