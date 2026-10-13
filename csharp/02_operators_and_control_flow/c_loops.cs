// Loops: for, foreach, while, do-while; break and continue.
// Run: dotnet run 02_operators_and_control_flow/c_loops.cs

for (int i = 1; i <= 3; i++)
    Console.Write($"{i} "); // 1 2 3
Console.WriteLine();

string[] fruits = ["apple", "mango", "banana"]; // a collection expression (C# 12)
foreach (string fruit in fruits)
{
    if (fruit == "mango") continue;
    Console.Write($"{fruit} "); // apple banana
}
Console.WriteLine();

int n = 12345, digits = 0;
while (n > 0)
{
    n /= 10;
    digits++;
}
Console.WriteLine($"digits: {digits}"); // 5

int tries = 0;
do tries++; while (tries < 3);
Console.WriteLine($"tries: {tries}"); // 3

foreach (var (fruit, index) in fruits.Select((f, i) => (f, i))) // index with LINQ
    Console.WriteLine($"{index}: {fruit}");

foreach (int i in Enumerable.Range(1, 10))
{
    if (i * i > 30) break;
    Console.Write($"{i * i} "); // 1 4 9 16 25
}
Console.WriteLine();
