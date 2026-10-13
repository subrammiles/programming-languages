package ch22_design_patterns.strategy;

import java.util.Map;
import java.util.function.DoubleUnaryOperator;

/*
Strategy pattern
Pick an algorithm at runtime by passing it in, instead of long if/else chains.
Classic version: an interface with one class per strategy.
Modern version: the "interface" is a functional interface, and each strategy is a lambda.
JDK example: Comparator passed to sort().
*/
public class StrategyPattern {

    // Classic
    interface DiscountStrategy {
        double apply(double amount);
    }

    static class NoDiscount implements DiscountStrategy {
        public double apply(double amount) { return amount; }
    }

    static class FestivalDiscount implements DiscountStrategy {
        public double apply(double amount) { return amount * 0.8; }
    }

    static class Checkout {
        private final DiscountStrategy strategy;
        Checkout(DiscountStrategy strategy) { this.strategy = strategy; }
        double total(double amount) { return strategy.apply(amount); }
    }

    public static void main(String[] args) {
        System.out.println(new Checkout(new NoDiscount()).total(1000));       // 1000.0
        System.out.println(new Checkout(new FestivalDiscount()).total(1000)); // 800.0

        // Modern: lambdas, no extra classes
        System.out.println(new Checkout(amount -> amount - 100).total(1000)); // 900.0

        Map<String, DoubleUnaryOperator> coupons = Map.of(
                "FLAT100", a -> Math.max(0, a - 100),
                "HALF", a -> a / 2,
                "NONE", DoubleUnaryOperator.identity());
        for (String code : new String[]{"FLAT100", "HALF", "NONE"}) {
            System.out.println(code + " -> " + coupons.get(code).applyAsDouble(1000));
        }
    }
}
