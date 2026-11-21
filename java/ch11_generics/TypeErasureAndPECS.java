package ch11_generics;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/*
Type erasure, and PECS (Producer Extends, Consumer Super)

TYPE ERASURE: generics exist only at compile time. The compiler checks the types,
then ERASES them: List<String> and List<Integer> are both just List at runtime.
Consequences:
  - no `new T()`, no `new T[10]`, no `instanceof List<String>`
  - cannot overload foo(List<String>) and foo(List<Integer>) (same erasure)
  - primitives are not allowed: List<int> -> use List<Integer>

GENERICS ARE INVARIANT: a List<Integer> is NOT a List<Number>, even though Integer is a Number.
Wildcards fix that:
  ? extends T  -> read T values out (the list PRODUCES T).   Cannot add (except null).
  ? super T    -> put T values in  (the list CONSUMES T).    Reading gives only Object.
  PECS: "Producer Extends, Consumer Super". Example: Collections.copy(List<? super T> dest, List<? extends T> src)
*/
public class TypeErasureAndPECS {

    // PRODUCER: we only read numbers from it -> extends
    static double sum(Collection<? extends Number> numbers) {
        double total = 0;
        for (Number n : numbers) total += n.doubleValue();
        return total;
    }

    // CONSUMER: we only put Integers into it -> super
    static void addOneToThree(List<? super Integer> target) {
        for (int i = 1; i <= 3; i++) target.add(i);
    }

    // Both: copy from a producer into a consumer
    static <T> void copy(List<? extends T> source, List<? super T> destination) {
        destination.addAll(source);
    }

    // Erasure workaround: pass a Class<T> "type token" to create instances / arrays
    static <T> T create(Class<T> type) throws ReflectiveOperationException {
        return type.getDeclaredConstructor().newInstance();
    }

    public static void main(String[] args) throws ReflectiveOperationException {
        // Erasure: same class at runtime
        List<String> strings = new ArrayList<>();
        List<Integer> ints = new ArrayList<>();
        System.out.println(strings.getClass() == ints.getClass());   // true
        System.out.println(strings.getClass().getName());            // java.util.ArrayList

        // Invariance
        List<Integer> integers = List.of(1, 2, 3);
        // List<Number> numbers = integers;        // compile error
        List<? extends Number> numbers = integers; // OK with a wildcard
        System.out.println(numbers.get(0));        // 1
        // numbers.add(4);                          // compile error: could be a List<Double>

        // extends: accepts lists of any Number subtype
        System.out.println(sum(List.of(1, 2, 3)) + " " + sum(List.of(1.5, 2.5)));   // 6.0 4.0

        // super: accepts List<Integer>, List<Number>, List<Object>
        List<Number> numberList = new ArrayList<>();
        List<Object> objectList = new ArrayList<>(List.of("start"));
        addOneToThree(numberList);
        addOneToThree(objectList);
        System.out.println(numberList + " " + objectList);           // [1, 2, 3] [start, 1, 2, 3]

        List<Object> everything = new ArrayList<>();
        copy(List.of("a", "b"), everything);
        copy(List.of(10), everything);
        System.out.println(everything);                              // [a, b, 10]

        // Raw types defeat the compiler checks (heap pollution) - avoid them
        List raw = strings;
        raw.add(42);                                                 // compiles with a warning
        try {
            String s = strings.get(0);                               // fails here, far from the bug
        } catch (ClassCastException e) {
            System.out.println("ClassCastException");                // ClassCastException
        }

        StringBuilder sb = create(StringBuilder.class);
        System.out.println(sb.append("made via Class<T>"));          // made via Class<T>
    }
}
