// Delegates: types that hold a reference to a METHOD, so functions can be passed around.
//  Func<T, TResult>   a function that returns a value
//  Action<T>          a function that returns nothing
//  Predicate<T>       a function returning bool
//  lambda             x => x * 2,  (a, b) => a + b,  () => { ... }
// Run: dotnet run 09_delegates_lambdas_events/a_delegates_and_lambdas.cs

Func<int, int, int> add = (a, b) => a + b;
Func<int, int> square = x => x * x;
Action<string> shout = text => Console.WriteLine(text.ToUpper() + "!");
Predicate<int> isEven = n => n % 2 == 0;

Console.WriteLine(add(2, 3)); // 5
Console.WriteLine(square(7)); // 49
shout("hello"); // HELLO!
Console.WriteLine(isEven(10)); // True

Console.WriteLine(Apply(5, square)); // 25
Console.WriteLine(Apply(5, Double)); // 10 -> a named method works too (a method group)

var multiplyBy = MakeMultiplier(3);
Console.WriteLine(multiplyBy(10)); // 30 -> a closure remembers "factor"

Func<int, int> pipeline = Compose<int>(x => x + 1, x => x * 10); // T can't be inferred from lambdas alone
Console.WriteLine(pipeline(4)); // 50

var counter = 0;
Action increment = () => counter++; // lambdas capture variables, not values
increment();
increment();
Console.WriteLine(counter); // 2

var greet = (string name = "world") => $"hello {name}"; // natural type + default parameters (C# 12)
Console.WriteLine(greet());

static int Apply(int value, Func<int, int> f) => f(value);
static int Double(int x) => x * 2;
static Func<int, int> MakeMultiplier(int factor) => x => x * factor;
static Func<T, T> Compose<T>(Func<T, T> first, Func<T, T> second) => x => second(first(x));
