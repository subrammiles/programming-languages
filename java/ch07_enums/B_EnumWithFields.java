package ch07_enums;

/*
Enums are classes: they can have fields, constructors and methods.
The constructor is always private and runs once per constant.
*/
public class B_EnumWithFields {

    enum Planet {
        MERCURY(3.303e+23, 2.4397e6),
        EARTH(5.976e+24, 6.37814e6),
        JUPITER(1.9e+27, 7.1492e7);

        private static final double G = 6.67300E-11;
        private final double mass;   // kg
        private final double radius; // m

        Planet(double mass, double radius) {
            this.mass = mass;
            this.radius = radius;
        }

        double surfaceGravity() {
            return G * mass / (radius * radius);
        }
    }

    enum Coin {
        PENNY(1), NICKEL(5), DIME(10), QUARTER(25);

        private final int cents;

        Coin(int cents) { this.cents = cents; }

        int cents() { return cents; }

        static Coin fromCents(int cents) {
            for (Coin c : values()) {
                if (c.cents == cents) return c;
            }
            throw new IllegalArgumentException("no coin worth " + cents);
        }
    }

    public static void main(String[] args) {
        for (Planet p : Planet.values()) {
            System.out.printf("%-8s gravity = %.2f m/s2%n", p, p.surfaceGravity());
        }
        // MERCURY  gravity = 3.70 m/s2
        // EARTH    gravity = 9.80 m/s2
        // JUPITER  gravity = 24.80 m/s2

        System.out.println(Coin.QUARTER.cents());  // 25
        System.out.println(Coin.fromCents(10));    // DIME
    }
}
