// Passing arguments
//  by value (default)  the method gets a copy of the value (or of the REFERENCE, for objects)
//  ref                 the method can change the caller's variable
//  out                 the method MUST assign it: a way to return extra values
//  in                  read-only reference (avoids copying big structs)
// Tuples are usually a cleaner way to return several values.
// Run: dotnet run 03_methods/b_ref_out_in_and_tuples.cs

int x = 10;
TryToChange(x);
Console.WriteLine(x); // 10 -> unchanged

Increment(ref x);
Console.WriteLine(x); // 11

if (TryDivide(10, 3, out int quotient, out int remainder))
    Console.WriteLine($"{quotient} r {remainder}"); // 3 r 1

var (min, max, avg) = Stats([4, 8, 6]); // deconstruct a tuple
Console.WriteLine($"min {min}, max {max}, avg {avg}"); // min 4, max 8, avg 6

var result = Stats([1, 2]);
Console.WriteLine(result.Max); // tuple elements have names

int[] numbers = [1, 2, 3];
DoubleAll(numbers);
Console.WriteLine(string.Join(",", numbers)); // 2,4,6 -> arrays are reference types: contents changed

static void TryToChange(int value) => value = 99;
static void Increment(ref int value) => value++;
static void DoubleAll(int[] values)
{
    for (int i = 0; i < values.Length; i++) values[i] *= 2;
}

static bool TryDivide(int a, int b, out int q, out int r)
{
    if (b == 0)
    {
        q = r = 0;
        return false;
    }
    q = a / b;
    r = a % b;
    return true;
}

static (int Min, int Max, double Avg) Stats(int[] values) => (values.Min(), values.Max(), values.Average());
