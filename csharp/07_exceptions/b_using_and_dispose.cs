// using and IDisposable
// Objects holding resources (files, connections, locks) implement IDisposable.
//  using (var x = ...) { }   or the declaration form:  using var x = ...;
// Dispose() is called automatically at the end, even if an exception is thrown.
// Run: dotnet run 07_exceptions/b_using_and_dispose.cs

using (var first = new Resource("first"))
{
    first.Use();
} // first.Dispose() here

Process();

static void Process()
{
    using var a = new Resource("a");
    using var b = new Resource("b");
    try
    {
        a.Use();
        throw new InvalidOperationException("something failed");
    }
    catch (InvalidOperationException e)
    {
        Console.WriteLine($"caught: {e.Message}");
    }
} // b is disposed, then a (reverse order)

sealed class Resource(string name) : IDisposable
{
    public void Use() => Console.WriteLine($"using {name}");

    public void Dispose() => Console.WriteLine($"disposed {name}");
}
