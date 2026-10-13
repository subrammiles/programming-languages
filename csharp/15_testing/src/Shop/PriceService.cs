namespace Shop;

public interface IPriceApi
{
    Task<decimal?> GetPriceAsync(string productId, CancellationToken cancellationToken = default);
}

public class PriceService(IPriceApi api)
{
    public async Task<decimal> GetPriceOrDefaultAsync(string productId, decimal fallback)
    {
        decimal? price = await api.GetPriceAsync(productId);
        return price is > 0 ? price.Value : fallback;
    }
}
