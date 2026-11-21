package ch06_oop.n_methods;

import java.util.Arrays;

/*
Varargs (variable-length arguments): Type... name
 - inside the method, the parameter is an ARRAY
 - callers can pass zero or more values, or an existing array
 - only one varargs parameter per method, and it must be the LAST one
JDK examples: String.format, List.of, Arrays.asList, System.out.printf
*/
public class B_Varargs {

    static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }

    static String join(String separator, String... parts) {   // fixed parameters come first
        return String.join(separator, parts);
    }

    // Overloading: a more specific (non-varargs) method wins
    static String describe(int a, int b) { return "two ints"; }
    static String describe(int... values) { return "varargs of " + values.length; }

    public static void main(String[] args) {
        System.out.println(sum());                       // 0
        System.out.println(sum(1, 2, 3));                // 6
        System.out.println(sum(new int[] {10, 20}));     // 30   (an array works too)

        System.out.println(join(", ", "a", "b", "c"));   // a, b, c

        System.out.println(describe(1, 2));              // two ints
        System.out.println(describe(1, 2, 3));           // varargs of 3
        System.out.println(describe());                  // varargs of 0

        // Gotcha: Arrays.asList with a primitive array gives ONE element (the array itself)
        int[] primitives = {1, 2, 3};
        Integer[] boxed = {1, 2, 3};
        System.out.println(Arrays.asList(primitives).size());   // 1
        System.out.println(Arrays.asList(boxed).size());        // 3
    }
}
