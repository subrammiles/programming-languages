// Arrays: fixed size, one type, indexed from 0. Arrays are reference types.
// Run: dotnet run 04_collections/a_arrays.cs

int[] scores = new int[5]; // all zeros
int[] primes = { 2, 3, 5, 7, 11 };
string[] names = ["Asha", "Ravi"]; // collection expression (C# 12)

scores[0] = 90;
Console.WriteLine($"{scores[0]} {scores.Length} {primes[^1]}"); // 90 5 11
Console.WriteLine(string.Join(",", primes[1..3])); // 3,5 -> a range creates a new array

Array.Sort(names);
Array.Reverse(primes);
Console.WriteLine($"{string.Join(",", names)} | {string.Join(",", primes)}");
Console.WriteLine($"{Array.IndexOf(primes, 5)} {primes.Contains(7)} {primes.Sum()} {primes.Max()}"); // 2 True 28 11

int[,] grid = { { 1, 2, 3 }, { 4, 5, 6 } }; // a rectangular 2D array
Console.WriteLine($"{grid[1, 2]} rows={grid.GetLength(0)} cols={grid.GetLength(1)}"); // 6 rows=2 cols=3

int[][] jagged = [[1], [2, 3], [4, 5, 6]]; // an array of arrays (rows can differ)
Console.WriteLine(jagged[2].Length); // 3

try
{
    Console.WriteLine(scores[10]);
}
catch (IndexOutOfRangeException e)
{
    Console.WriteLine(e.Message); // C# checks bounds: Index was outside the bounds of the array.
}
