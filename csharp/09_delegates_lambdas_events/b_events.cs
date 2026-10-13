// Events: the publisher/subscriber pattern built on delegates.
//  public event EventHandler<T>? SomethingHappened;
//  subscribers attach with +=  and detach with -=
//  only the declaring class can raise the event
// Run: dotnet run 09_delegates_lambdas_events/b_events.cs

var stock = new Stock("TCS", 4000m);

stock.PriceChanged += (sender, e) => Console.WriteLine($"[log] {e.Symbol}: {e.OldPrice} -> {e.NewPrice}");
EventHandler<PriceChangedEventArgs> alert = (sender, e) =>
{
    decimal change = (e.NewPrice - e.OldPrice) / e.OldPrice * 100;
    if (Math.Abs(change) >= 5) Console.WriteLine($"[alert] {e.Symbol} moved {change:F1}%");
};
stock.PriceChanged += alert;

stock.Price = 4100m; // log only
stock.Price = 3800m; // log + alert
stock.PriceChanged -= alert;
stock.Price = 3000m; // log only

class PriceChangedEventArgs(string symbol, decimal oldPrice, decimal newPrice) : EventArgs
{
    public string Symbol { get; } = symbol;
    public decimal OldPrice { get; } = oldPrice;
    public decimal NewPrice { get; } = newPrice;
}

class Stock(string symbol, decimal price)
{
    public event EventHandler<PriceChangedEventArgs>? PriceChanged;

    public decimal Price
    {
        get => price;
        set
        {
            if (value == price) return;
            var args = new PriceChangedEventArgs(symbol, price, value);
            price = value;
            PriceChanged?.Invoke(this, args); // ?. : no subscribers -> nothing happens
        }
    }
}
