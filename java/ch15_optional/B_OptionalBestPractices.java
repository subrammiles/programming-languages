package ch15_optional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/*
Optional - a box that may or may not contain a value.
Use it as a RETURN type for "might not find anything", instead of returning null.
Prefer:  map, flatMap, filter, orElse, orElseGet, orElseThrow, ifPresentOrElse, or, stream
Avoid:   get() without checking, Optional fields, Optional parameters, Optional<List> (return an empty list)
*/
public class B_OptionalBestPractices {

    record User(String name, String email) {     // email may be null
        Optional<String> findEmail() {          // expose the "maybe" through a method
            return Optional.ofNullable(email);
        }
    }

    static final Map<Integer, User> DB = Map.of(
            1, new User("Asha", "asha@example.com"),
            2, new User("Ravi", null));

    static Optional<User> findUser(int id) {
        return Optional.ofNullable(DB.get(id)); // ofNullable: empty if the value is null
    }

    public static void main(String[] args) {
        // map: transform the value if present
        System.out.println(findUser(1).map(User::name).orElse("unknown")); // Asha
        System.out.println(findUser(9).map(User::name).orElse("unknown")); // unknown

        // flatMap: when the function itself returns an Optional
        System.out.println(findUser(1).flatMap(User::findEmail).orElse("no email")); // asha@example.com
        System.out.println(findUser(2).flatMap(User::findEmail).orElse("no email")); // no email

        // filter
        System.out.println(findUser(1).filter(u -> u.name().startsWith("R")).isPresent()); // false

        // orElse vs orElseGet: orElse ALWAYS evaluates its argument
        String a = findUser(1).map(User::name).orElse(expensiveDefault());     // prints "computing default..."
        String b = findUser(1).map(User::name).orElseGet(() -> expensiveDefault()); // does not
        System.out.println(a + " " + b);

        // orElseThrow
        try {
            findUser(9).orElseThrow(() -> new IllegalArgumentException("user 9 not found"));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }

        // ifPresentOrElse (Java 9)
        findUser(2).ifPresentOrElse(
                u -> System.out.println("found " + u.name()),
                () -> System.out.println("not found"));

        // or (Java 9): try another source
        System.out.println(findUser(9).or(() -> findUser(2)).map(User::name).get()); // Ravi

        // stream (Java 9): drop empties from a list of Optionals
        List<String> names = List.of(1, 9, 2).stream()
                .map(B_OptionalBestPractices::findUser)
                .flatMap(Optional::stream)
                .map(User::name)
                .toList();
        System.out.println(names); // [Asha, Ravi]
    }

    static String expensiveDefault() {
        System.out.println("computing default...");
        return "default";
    }
}
