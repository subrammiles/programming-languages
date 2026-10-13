// Methods
//  static int Add(int a, int b) { return a + b; }    or expression-bodied:  => a + b;
//  optional parameters (defaults), named arguments, params arrays,
//  overloading (same name, different parameters), local functions, recursion
// Run: dotnet run 03_methods/a_methods.cs

Console.WriteLine(MathTools.Add(2, 3)); // 5
Console.WriteLine(MathTools.Add(2.5, 3)); // 5.5 -> the double overload
Console.WriteLine(MathTools.Greet("Asha")); // Hello, Asha!
Console.WriteLine(MathTools.Greet("Ravi", greeting: "Namaste")); // named argument
Console.WriteLine(MathTools.Sum()); // 0
Console.WriteLine(MathTools.Sum(1, 2, 3, 4)); // 10
Console.WriteLine(MathTools.Factorial(10)); // 3628800
Console.WriteLine(MathTools.CountVowels("programming")); // 3

static class MathTools
{
    public static int Add(int a, int b) => a + b;

    public static double Add(double a, double b) => a + b; // overload

    public static string Greet(string name, string greeting = "Hello") => $"{greeting}, {name}!";

    public static int Sum(params int[] numbers) // any number of arguments
    {
        int total = 0;
        foreach (int n in numbers) total += n;
        return total;
    }

    public static long Factorial(int n) => n <= 1 ? 1 : n * Factorial(n - 1);

    public static int CountVowels(string word)
    {
        return word.Count(IsVowel);

        static bool IsVowel(char c) => "aeiou".Contains(c); // a local function
    }
}
