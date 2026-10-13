package ch09_sealed_classes_and_pattern_matching;

/*
Pattern matching for instanceof (Java 16)
Test the type AND create a typed variable in one step. No manual cast needed.
*/
public class A_InstanceofPattern {

    static String describe(Object obj) {
        // Old way
        if (obj instanceof String) {
            String s = (String) obj;
            return "String of length " + s.length();
        }
        // New way
        if (obj instanceof Integer i) {
            return "Integer, doubled = " + (i * 2);
        }
        // The variable can be used in the same condition
        if (obj instanceof Double d && d > 100) {
            return "Big double " + d;
        }
        return "Something else: " + obj;
    }

    public static void main(String[] args) {
        System.out.println(describe("hello"));  // String of length 5
        System.out.println(describe(21));       // Integer, doubled = 42
        System.out.println(describe(500.0));    // Big double 500.0
        System.out.println(describe(5.0));      // Something else: 5.0

        // Common use: equals()
        record Point(int x, int y) {}
        Object o = new Point(1, 2);
        if (!(o instanceof Point p)) {
            return;
        }
        System.out.println(p.x() + p.y()); // 3 -> p is in scope after the negated check
    }
}
