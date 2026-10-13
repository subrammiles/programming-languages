// Generics: write code once for many types, keeping type safety.
//  T Max<T>(T a, T b) where T : IComparable<T>
//  class Box<T> { ... }
//  constraints: where T : class / struct / new() / SomeBase / ISomeInterface / notnull
// The collections (List<T>, Dictionary<K,V>) and LINQ are all generic.
// Run: dotnet run 08_generics/a_generics.cs

Console.WriteLine(Max(3, 7)); // 7
Console.WriteLine(Max("apple", "banana")); // banana
Console.WriteLine(Max(2.5, 1.5)); // 2.5

var intStack = new Stack<int>();
intStack.Push(1);
intStack.Push(2);
Console.WriteLine($"{intStack.Pop()} {intStack.Count}"); // 2 1

var cache = new Cache<string, decimal>();
cache.Set("pen", 10m);
Console.WriteLine(cache.TryGet("pen", out var price) ? $"pen costs {price}" : "missing");
Console.WriteLine(cache.TryGet("ink", out _) ? "found" : "ink missing");

Console.WriteLine(Sum([1, 2, 3])); // 6
Console.WriteLine(Sum([1.5, 2.5])); // 4 -> generic math (.NET 7): one method for every number type

var pair = new Pair<string, int>("age", 30);
Console.WriteLine(pair); // Pair { Key = age, Value = 30 }

static T Max<T>(T a, T b) where T : IComparable<T> => a.CompareTo(b) >= 0 ? a : b;

static T Sum<T>(IEnumerable<T> values) where T : System.Numerics.INumber<T>
{
    T total = T.Zero;
    foreach (T v in values) total += v;
    return total;
}

class Stack<T>
{
    private readonly List<T> _items = [];
    public int Count => _items.Count;
    public void Push(T item) => _items.Add(item);
    public T Pop()
    {
        if (_items.Count == 0) throw new InvalidOperationException("stack is empty");
        T item = _items[^1];
        _items.RemoveAt(_items.Count - 1);
        return item;
    }
}

class Cache<TKey, TValue> where TKey : notnull
{
    private readonly Dictionary<TKey, TValue> _data = new();
    public void Set(TKey key, TValue value) => _data[key] = value;
    public bool TryGet(TKey key, out TValue? value) => _data.TryGetValue(key, out value);
}

record Pair<TKey, TValue>(TKey Key, TValue Value);
