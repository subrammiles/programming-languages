namespace Shop.Tests;

// Testing async code: make the test method async Task and await.
// The fake records how it was called, so the test can check the interaction too.
public class PriceServiceTests
{
    [Fact]
    public async Task ReturnsThePriceFromTheApi()
    {
        var api = new FakePriceApi(42.5m);
        var service = new PriceService(api);

        decimal price = await service.GetPriceOrDefaultAsync("p-1", fallback: 0);

        Assert.Equal(42.5m, price);
        Assert.Equal(["p-1"], api.RequestedIds);
    }

    [Theory]
    [InlineData(null)]
    [InlineData(-5.0)]
    public async Task FallsBackWhenThePriceIsMissingOrInvalid(double? apiPrice)
    {
        var service = new PriceService(new FakePriceApi((decimal?)apiPrice));
        Assert.Equal(99m, await service.GetPriceOrDefaultAsync("p-2", fallback: 99m));
    }

    private sealed class FakePriceApi(decimal? price) : IPriceApi
    {
        public List<string> RequestedIds { get; } = [];

        public Task<decimal?> GetPriceAsync(string productId, CancellationToken cancellationToken = default)
        {
            RequestedIds.Add(productId);
            return Task.FromResult(price);
        }
    }
}
