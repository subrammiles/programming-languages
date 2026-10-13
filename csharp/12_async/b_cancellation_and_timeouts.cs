// Cancellation: async methods take a CancellationToken and stop when it is cancelled.
//  CancellationTokenSource cts = new(TimeSpan.FromSeconds(2));   cancels itself after 2s
//  cts.Cancel()                                                   cancel now
//  task.WaitAsync(timeout)                                        give up waiting after a timeout
// Run: dotnet run 12_async/b_cancellation_and_timeouts.cs

using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(350));
try
{
    await DownloadAsync(cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("download cancelled");
}

try
{
    await Task.Delay(1000).WaitAsync(TimeSpan.FromMilliseconds(100));
}
catch (TimeoutException)
{
    Console.WriteLine("timed out waiting");
}

static async Task DownloadAsync(CancellationToken token)
{
    for (int chunk = 1; chunk <= 10; chunk++)
    {
        await Task.Delay(100, token); // throws OperationCanceledException when cancelled
        Console.WriteLine($"chunk {chunk}");
    }
}
