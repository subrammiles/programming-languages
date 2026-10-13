namespace Shop.Tests;

// xUnit basics
//  [Fact]                  a test with no inputs
//  [Theory] + [InlineData] the same test with several inputs (data-driven)
//  Assert.Equal / True / Throws / Contains / Empty ...
// A new instance of the test class is created for EVERY test, so the constructor is per-test setup.
public class CartTests
{
    private readonly Cart _cart = new(new NoDiscount());

    [Fact]
    public void NewCartIsEmpty()
    {
        Assert.Equal(0, _cart.Count);
        Assert.Equal(0m, _cart.Subtotal);
    }

    [Fact]
    public void AddingTheSameItemIncreasesItsQuantity()
    {
        _cart.Add("pen", 10m);
        _cart.Add("pen", 10m, quantity: 2);

        Assert.Equal(1, _cart.Count);
        Assert.Equal(30m, _cart.Subtotal);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public void RejectsQuantitiesBelowOne(int quantity)
    {
        var ex = Assert.Throws<ArgumentOutOfRangeException>(() => _cart.Add("pen", 10m, quantity));
        Assert.Equal("quantity", ex.ParamName);
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void RejectsBlankNames(string name)
    {
        Assert.Throws<ArgumentException>(() => _cart.Add(name, 10m));
    }

    [Theory]
    [InlineData(500, 500)] // below the threshold: no discount
    [InlineData(1000, 900)] // 10% off
    [InlineData(2500, 2250)]
    public void BulkDiscountAppliesFromOneThousand(decimal price, decimal expectedTotal)
    {
        var cart = new Cart(new BulkDiscount());
        cart.Add("item", price);
        Assert.Equal(expectedTotal, cart.Total());
    }

    [Fact]
    public void UsesTheDiscountPolicyItIsGiven()
    {
        var cart = new Cart(new FixedDiscount(50));
        cart.Add("book", 99.99m);
        Assert.Equal(50.00m, cart.Total()); // 49.995 rounds to 50.00
    }

    // Hand-written fakes: tiny classes implementing the interface
    private sealed class NoDiscount : IDiscountPolicy
    {
        public decimal DiscountPercent(decimal subtotal) => 0;
    }

    private sealed class FixedDiscount(decimal percent) : IDiscountPolicy
    {
        public decimal DiscountPercent(decimal subtotal) => percent;
    }
}
