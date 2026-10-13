package ch12_collections.modern;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

/*
Immutable collection factories (Java 9 / 10)
 List.of(...)  Set.of(...)  Map.of(k, v, ...)  Map.entry(k, v)
 List.copyOf(c)  Set.copyOf(c)  Map.copyOf(m)
 stream.toList() (Java 16)
They:
 - throw UnsupportedOperationException on add/remove/set
 - do not allow null
 - Set.of and Map.of reject duplicates
*/
public class A_ImmutableCollections {

    public static void main(String[] args) {
        List<String> fruits = List.of("apple", "banana");
        Set<Integer> primes = Set.of(2, 3, 5, 7);
        Map<String, Integer> stock = Map.of("pen", 10, "book", 4);

        try {
            fruits.add("mango");
        } catch (UnsupportedOperationException e) {
            System.out.println("List.of is immutable");
        }

        try {
            List.of("a", null);
        } catch (NullPointerException e) {
            System.out.println("nulls are not allowed");
        }

        try {
            Set.of(1, 1);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage()); // duplicate element: 1
        }

        // unmodifiableList is only a VIEW: changes to the original show through
        List<String> original = new ArrayList<>(List.of("x"));
        List<String> view = Collections.unmodifiableList(original);
        List<String> copy = List.copyOf(original);
        original.add("y");
        System.out.println(view);  // [x, y]
        System.out.println(copy);  // [x]

        // Need a mutable list? Wrap it
        List<String> mutable = new ArrayList<>(fruits);
        mutable.add("mango");
        System.out.println(mutable); // [apple, banana, mango]

        System.out.println(primes.contains(5) + " " + stock.get("pen")); // true 10
    }
}
