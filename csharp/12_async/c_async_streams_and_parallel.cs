// More async tools
//  IAsyncEnumerable<T> + await foreach   values that arrive over time (C# 8)
//  Parallel.ForEachAsync                 process many items with limited concurrency
//  Channel<T>                            a fast async producer/consumer queue
//  lock / System.Threading.Lock (C# 13)  protect shared state
// Run: dotnet run 12_async/c_async_streams_and_parallel.cs

using System.Threading.Channels;

await foreach (int price in PriceTicker(4))
    Console.Write($"{price} ");
Console.WriteLine();

int processed = 0;
var gate = new Lock(); // the dedicated lock type (C# 13 / .NET 9)
await Parallel.ForEachAsync(Enumerable.Range(1, 20), new ParallelOptions { MaxDegreeOfParallelism = 4 }, async (i, ct) =>
{
    await Task.Delay(10, ct);
    lock (gate) processed++;
});
Console.WriteLine($"processed {processed} items, at most 4 at a time"); // 20

var channel = Channel.CreateBounded<int>(capacity: 3);
var producer = Task.Run(async () =>
{
    for (int i = 1; i <= 5; i++) await channel.Writer.WriteAsync(i * 10);
    channel.Writer.Complete();
});
int total = 0;
await foreach (int item in channel.Reader.ReadAllAsync()) total += item;
await producer;
Console.WriteLine($"consumed total {total}"); // 150

int counter = 0;
await Task.WhenAll(Enumerable.Range(0, 1000).Select(_ => Task.Run(() => Interlocked.Increment(ref counter))));
Console.WriteLine($"atomic counter {counter}"); // 1000

static async IAsyncEnumerable<int> PriceTicker(int count)
{
    int price = 100;
    for (int i = 0; i < count; i++)
    {
        await Task.Delay(50);
        yield return price += (i % 2 == 0 ? 3 : -1);
    }
}
