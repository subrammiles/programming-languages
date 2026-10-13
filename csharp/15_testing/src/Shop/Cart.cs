namespace Shop; // file-scoped namespace (C# 10)

/// <summary>A shopping cart: the code under test.</summary>
public class Cart(IDiscountPolicy discountPolicy)
{
    private readonly Dictionary<string, (decimal Price, int Quantity)> _items = new();

    public int Count => _items.Count;

    public void Add(string name, decimal price, int quantity = 1)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentOutOfRangeException.ThrowIfNegative(price);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(quantity);

        int existing = _items.TryGetValue(name, out var item) ? item.Quantity : 0;
        _items[name] = (price, existing + quantity);
    }

    public decimal Subtotal => _items.Values.Sum(i => i.Price * i.Quantity);

    public decimal Total()
    {
        decimal subtotal = Subtotal;
        decimal percent = discountPolicy.DiscountPercent(subtotal);
        return Math.Round(subtotal * (100 - percent) / 100, 2);
    }
}

/// <summary>A dependency the cart talks to, so tests can swap in a fake.</summary>
public interface IDiscountPolicy
{
    decimal DiscountPercent(decimal subtotal);
}

public class BulkDiscount : IDiscountPolicy
{
    public decimal DiscountPercent(decimal subtotal) => subtotal >= 1000 ? 10 : 0;
}
