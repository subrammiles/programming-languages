package ch13_lambdas;

import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;

/*
Method references - a shorter way to write a lambda that only calls one method.
 Kind                          Lambda                       Method reference
 1. Static method              x -> Integer.parseInt(x)     Integer::parseInt
 2. Method of a given object   x -> System.out.println(x)   System.out::println
 3. Method of the parameter    s -> s.toUpperCase()         String::toUpperCase
 4. Constructor                () -> new ArrayList<>()      ArrayList::new
*/
public class B_MethodReferences {

    record Person(String name) {}

    public static void main(String[] args) {
        List<String> numbers = List.of("3", "1", "2");

        // 1. static
        Function<String, Integer> parse = Integer::parseInt;
        System.out.println(numbers.stream().map(parse).mapToInt(Integer::intValue).sum()); // 6

        // 2. instance method of a particular object
        numbers.forEach(System.out::println);

        // 3. instance method of an arbitrary object (the parameter itself)
        System.out.println(List.of("a", "b").stream().map(String::toUpperCase).toList()); // [A, B]
        BiFunction<String, String, Boolean> startsWith = String::startsWith; // (s, prefix) -> s.startsWith(prefix)
        System.out.println(startsWith.apply("java", "ja")); // true

        // 4. constructor
        Supplier<StringBuilder> newBuilder = StringBuilder::new;
        System.out.println(newBuilder.get().append("built").toString()); // built
        System.out.println(List.of("Asha", "Ravi").stream().map(Person::new).toList());
        // [Person[name=Asha], Person[name=Ravi]]
    }
}
