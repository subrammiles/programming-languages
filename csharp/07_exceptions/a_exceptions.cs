// Exceptions
//  try { } catch (SpecificException e) when (condition) { } finally { }
//  throw new SomeException("message");   throw;  re-throws keeping the stack trace
//  Common: ArgumentException, ArgumentNullException, InvalidOperationException,
//          NullReferenceException, IndexOutOfRangeException, KeyNotFoundException,
//          FormatException, DivideByZeroException, IOException, HttpRequestException
// Run: dotnet run 07_exceptions/a_exceptions.cs

static string Classify(int index)
{
    int[] numbers = [10, 20];
    try
    {
        return $"value {100 / numbers[index]}";
    }
    catch (IndexOutOfRangeException)
    {
        return "index out of range";
    }
    finally
    {
        Console.Write("[finally] "); // always runs, even after return
    }
}

Console.WriteLine(Classify(0)); // [finally] value 10
Console.WriteLine(Classify(5)); // [finally] index out of range

try
{
    int zero = 0;
    Console.WriteLine(1 / zero);
}
catch (DivideByZeroException e)
{
    Console.WriteLine($"{e.GetType().Name}: {e.Message}");
}

// Exception filters: catch only when a condition holds
foreach (int code in new[] { 404, 500 })
{
    try
    {
        throw new HttpStatusException(code);
    }
    catch (HttpStatusException e) when (e.StatusCode == 404)
    {
        Console.WriteLine("not found: show a friendly page");
    }
    catch (HttpStatusException e)
    {
        Console.WriteLine($"server error {e.StatusCode}: retry later");
    }
}

// Guard clauses with the built-in throw helpers
static decimal Withdraw(decimal balance, decimal amount)
{
    ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount);
    if (amount > balance) throw new InsufficientFundsException(balance, amount);
    return balance - amount;
}

try
{
    Withdraw(100, 500);
}
catch (InsufficientFundsException e)
{
    Console.WriteLine($"{e.Message} (short by {e.Shortfall})");
}

// Wrapping keeps the original as InnerException
try
{
    try
    {
        int.Parse("abc");
    }
    catch (FormatException e)
    {
        throw new InvalidOperationException("could not read the config", e);
    }
}
catch (InvalidOperationException e)
{
    Console.WriteLine($"{e.Message} <- {e.InnerException?.GetType().Name}");
}

class InsufficientFundsException(decimal balance, decimal amount)
    : Exception($"cannot withdraw {amount}, balance is {balance}")
{
    public decimal Shortfall { get; } = amount - balance;
}

class HttpStatusException(int statusCode) : Exception($"HTTP {statusCode}")
{
    public int StatusCode { get; } = statusCode;
}
