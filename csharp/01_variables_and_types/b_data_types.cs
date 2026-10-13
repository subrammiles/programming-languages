// Built-in types
//  Integers: byte (0..255), short, int (32-bit), long (64-bit), and unsigned uint, ulong ...
//  Decimals: float (~7 digits), double (~15 digits, the default), decimal (exact, 28 digits: use for MONEY)
//  Others:   bool, char (a UTF-16 code unit), string (immutable text), object (base of everything)
// VALUE types (int, double, bool, struct ...) hold their data directly;
// REFERENCE types (string, arrays, classes) hold a reference to an object on the heap.
// Run: dotnet run 01_variables_and_types/b_data_types.cs

Console.WriteLine($"int:    {int.MinValue} .. {int.MaxValue}");
Console.WriteLine($"long:   {long.MaxValue}");
Console.WriteLine($"byte:   {byte.MinValue} .. {byte.MaxValue}");
Console.WriteLine($"sizeof(int)={sizeof(int)}, sizeof(long)={sizeof(long)}, sizeof(decimal)={sizeof(decimal)}");

int population = 1_400_000_000; // digit separators
long distance = 384_400_000L;
float f = 3.14f;
double d = 0.1 + 0.2;
decimal money = 0.1m + 0.2m;
Console.WriteLine($"{population} {distance} {f}");
Console.WriteLine($"double  0.1 + 0.2 = {d:R}  (== 0.3? {d == 0.3})"); // 0.30000000000000004 False
Console.WriteLine($"decimal 0.1 + 0.2 = {money}  (== 0.3? {money == 0.3m})"); // 0.3 True

Console.WriteLine($"7 / 2 = {7 / 2}, 7 / 2.0 = {7 / 2.0}, 7 % 2 = {7 % 2}"); // 3 3.5 1

int max = int.MaxValue;
Console.WriteLine($"overflow wraps: {unchecked(max + 1)}"); // -2147483648
try
{
    int boom = checked(max + 1); // checked arithmetic throws instead
    Console.WriteLine(boom);
}
catch (OverflowException e)
{
    Console.WriteLine($"OverflowException: {e.Message}");
}

char c = 'A';
Console.WriteLine($"'{c}' = {(int)c}, next = {(char)(c + 1)}, IsLetter = {char.IsLetter(c)}");

object boxed = 42; // a value type stored as object ("boxing")
Console.WriteLine($"{boxed} is {boxed.GetType()}"); // 42 is System.Int32
Console.WriteLine($"default(int)={default(int)}, default(bool)={default(bool)}, default(string)={default(string) ?? "null"}");
