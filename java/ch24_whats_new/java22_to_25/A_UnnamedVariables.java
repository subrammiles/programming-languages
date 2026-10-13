package ch24_whats_new.java22_to_25;

import java.util.List;
import java.util.Map;

/*
Unnamed variables and patterns: _ (Java 22)
Use _ for a variable or pattern part you must declare but never use.
It tells the reader (and the compiler) "intentionally ignored".
Requires JDK 22+.
*/
public class A_UnnamedVariables {

    sealed interface Shape permits Circle, Rect {}
    record Circle(double x, double y, double radius) implements Shape {}
    record Rect(double width, double height) implements Shape {}

    public static void main(String[] args) {
        // Ignored exception variable
        try {
            Integer.parseInt("abc");
        } catch (NumberFormatException _) {
            System.out.println("not a number");
        }

        // Ignored loop variable
        int count = 0;
        for (String _ : List.of("a", "b", "c")) count++;
        System.out.println(count); // 3

        // Ignored lambda parameter
        Map<String, Integer> stock = new java.util.HashMap<>(Map.of("pen", 1));
        stock.computeIfPresent("pen", (_, qty) -> qty + 10);
        System.out.println(stock); // {pen=11}

        // Ignored parts of a record pattern
        List<Shape> shapes = List.of(new Circle(0, 0, 2), new Rect(3, 4));
        for (Shape s : shapes) {
            double area = switch (s) {
                case Circle(_, _, double r) -> Math.PI * r * r; // x and y not needed
                case Rect(double w, double h) -> w * h;
            };
            System.out.printf("%.2f%n", area);
        }
    }
}
