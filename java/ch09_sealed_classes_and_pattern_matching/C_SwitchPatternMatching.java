package ch09_sealed_classes_and_pattern_matching;

/*
Pattern matching for switch (Java 21)
 - case Type variable ->      match by type
 - when condition             extra condition (a "guard")
 - case null                  handle null instead of throwing NullPointerException
 - with a sealed type, no default is needed: the compiler checks every subtype is covered
*/
public class C_SwitchPatternMatching {

    sealed interface Shape permits Circle, Square, Rectangle {}
    record Circle(double radius) implements Shape {}
    record Square(double side) implements Shape {}
    record Rectangle(double width, double height) implements Shape {}

    static double area(Shape shape) {
        return switch (shape) {     // no default needed; add a new Shape and this stops compiling
            case Circle c -> Math.PI * c.radius() * c.radius();
            case Square s -> s.side() * s.side();
            case Rectangle r -> r.width() * r.height();
        };
    }

    static String classify(Object obj) {
        return switch (obj) {
            case null -> "null!";
            case Integer i when i < 0 -> "negative int";
            case Integer i -> "int " + i;
            case String s when s.isBlank() -> "blank string";
            case String s -> "string \"" + s + "\"";
            case int[] arr -> "int array of length " + arr.length;
            default -> "other: " + obj.getClass().getSimpleName();
        };
    }

    public static void main(String[] args) {
        System.out.printf("%.2f%n", area(new Circle(1)));       // 3.14
        System.out.println(area(new Rectangle(2, 3)));         // 6.0

        System.out.println(classify(-5));          // negative int
        System.out.println(classify(7));           // int 7
        System.out.println(classify("  "));        // blank string
        System.out.println(classify("hi"));        // string "hi"
        System.out.println(classify(new int[3]));  // int array of length 3
        System.out.println(classify(null));        // null!
        System.out.println(classify(2.5));         // other: Double
    }
}
