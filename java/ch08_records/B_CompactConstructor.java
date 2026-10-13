package ch08_records;

import java.util.List;

/*
Compact constructor - validate or normalise values.
No parameter list and no field assignments; they happen automatically at the end.
*/
public class B_CompactConstructor {

    record Person(String name, int age) {
        Person {
            if (name == null || name.isBlank()) throw new IllegalArgumentException("name is required");
            if (age < 0) throw new IllegalArgumentException("age cannot be negative");
            name = name.strip(); // normalise before it is stored
        }
    }

    record Team(String name, List<String> members) {
        Team {
            members = List.copyOf(members); // defensive copy -> truly immutable
        }
    }

    public static void main(String[] args) {
        System.out.println(new Person("  Asha ", 30)); // Person[name=Asha, age=30]

        try {
            new Person("Ravi", -1);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage()); // age cannot be negative
        }

        var list = new java.util.ArrayList<>(List.of("a", "b"));
        Team t = new Team("dev", list);
        list.add("c");                  // changing the original list...
        System.out.println(t.members()); // [a, b]  ...does not affect the record
    }
}
