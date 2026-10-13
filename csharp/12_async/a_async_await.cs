// async / await: asynchronous code that reads like ordinary code.
//  async Task<T> Method()   returns a Task that completes later with a T
//  await task               pause THIS method until the task finishes, without blocking the thread
//  Task.WhenAll             run several operations at the same time and wait for all
//  Task.WhenAny             continue when the first finishes
// Use async for I/O (web requests, files, databases). For CPU-heavy work see Parallel / Task.Run.
// Run: dotnet run 12_async/a_async_await.cs

using System.Diagnostics;

var sw = Stopwatch.StartNew();
string user = await FetchUserAsync(1); // top-level await
Console.WriteLine($"{user} after {sw.ElapsedMilliseconds / 100 * 100}ms"); // ~300ms

sw.Restart();
string a = await FetchUserAsync(2);
string b = await FetchUserAsync(3);
Console.WriteLine($"one after another: {a}, {b} in ~{Round(sw)}ms"); // ~600ms

sw.Restart();
string[] all = await Task.WhenAll(FetchUserAsync(4), FetchUserAsync(5), FetchUserAsync(6));
Console.WriteLine($"in parallel: {string.Join(", ", all)} in ~{Round(sw)}ms"); // ~300ms

Task<string> slow = FetchUserAsync(7, delayMs: 500);
Task<string> fast = FetchUserAsync(8, delayMs: 100);
Task<string> winner = await Task.WhenAny(slow, fast);
Console.WriteLine($"first to finish: {await winner}"); // user8

try
{
    await FetchUserAsync(-1);
}
catch (ArgumentException e)
{
    Console.WriteLine($"awaited exception: {e.Message}"); // exceptions surface at the await
}

static async Task<string> FetchUserAsync(int id, int delayMs = 300)
{
    await Task.Delay(delayMs); // pretend network I/O
    if (id < 0) throw new ArgumentException($"bad id {id}");
    return $"user{id}";
}

static long Round(Stopwatch sw) => (sw.ElapsedMilliseconds + 50) / 100 * 100;
