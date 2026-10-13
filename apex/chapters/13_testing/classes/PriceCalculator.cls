/**
 * Code designed for testing: it depends on an interface (DiscountPolicy),
 * so a test can pass in a simple fake instead of the real thing.
 */
public with sharing class PriceCalculator {
    public interface DiscountPolicy {
        Decimal discountPercent(Decimal amount);
    }

    public class SeasonalDiscount implements DiscountPolicy {
        public Decimal discountPercent(Decimal amount) {
            return amount > 1000 ? 10 : 0;
        }
    }

    private final DiscountPolicy policy;

    public PriceCalculator(DiscountPolicy policy) {
        this.policy = policy;
    }

    public Decimal total(List<Course__c> courses) {
        Decimal sum = 0;
        for (Course__c c : courses) {
            sum += c.Price__c ?? 0;
        }
        return (sum * (100 - policy.discountPercent(sum)) / 100).setScale(2);
    }
}
