package ch07_enums;

import java.util.function.IntBinaryOperator;

/*
1. Each constant can have its own body (override a method).
2. Enums can implement interfaces.
3. Enums are the simplest thread-safe Singleton (see ch22_design_patterns).
*/
public class C_EnumMethodsAndInterfaces {

    enum Operation implements IntBinaryOperator {
        PLUS("+") {
            public int applyAsInt(int a, int b) { return a + b; }
        },
        MINUS("-") {
            public int applyAsInt(int a, int b) { return a - b; }
        },
        TIMES("*") {
            public int applyAsInt(int a, int b) { return a * b; }
        };

        private final String symbol;

        Operation(String symbol) { this.symbol = symbol; }

        @Override
        public String toString() { return symbol; }
    }

    enum AppConfig {
        INSTANCE;
        private String env = "dev";
        String env() { return env; }
    }

    public static void main(String[] args) {
        for (Operation op : Operation.values()) {
            System.out.println("6 " + op + " 3 = " + op.applyAsInt(6, 3));
        }
        // 6 + 3 = 9
        // 6 - 3 = 3
        // 6 * 3 = 18

        System.out.println(AppConfig.INSTANCE.env()); // dev
    }
}
