package ch22_design_patterns.builder;

/*
Builder pattern
Problem: a constructor with many parameters (some optional) is hard to read:
   new Pizza("large", true, false, true, false, 2)   // what does each boolean mean?
Solution: a Builder sets values by name, then build() creates the object.
Used by: StringBuilder, HttpRequest.newBuilder(), Lombok @Builder, many libraries.
*/
public class BuilderPattern {

    static final class Pizza {
        private final String size;
        private final boolean cheese;
        private final boolean mushrooms;
        private final int extraToppings;

        private Pizza(Builder b) {
            this.size = b.size;
            this.cheese = b.cheese;
            this.mushrooms = b.mushrooms;
            this.extraToppings = b.extraToppings;
        }

        static Builder builder(String size) { return new Builder(size); }

        @Override
        public String toString() {
            return size + " pizza [cheese=" + cheese + ", mushrooms=" + mushrooms + ", extra=" + extraToppings + "]";
        }

        static final class Builder {
            private final String size;   // required
            private boolean cheese;      // optional, default false
            private boolean mushrooms;
            private int extraToppings;

            private Builder(String size) { this.size = size; }

            Builder cheese() { this.cheese = true; return this; }
            Builder mushrooms() { this.mushrooms = true; return this; }
            Builder extraToppings(int n) { this.extraToppings = n; return this; }

            Pizza build() {
                if (extraToppings > 5) throw new IllegalStateException("too many toppings");
                return new Pizza(this);
            }
        }
    }

    public static void main(String[] args) {
        Pizza p = Pizza.builder("large").cheese().extraToppings(2).build();
        System.out.println(p); // large pizza [cheese=true, mushrooms=false, extra=2]

        System.out.println(Pizza.builder("small").build()); // small pizza [cheese=false, mushrooms=false, extra=0]
    }
}
