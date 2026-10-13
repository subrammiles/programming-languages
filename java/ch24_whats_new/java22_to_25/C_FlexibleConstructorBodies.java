package ch24_whats_new.java22_to_25;

/*
Flexible constructor bodies (Java 25)
Before: super(...) or this(...) had to be the very FIRST statement.
Now:    you may run code before it, e.g. to validate arguments or compute values,
        as long as that code does not use "this" (the object is not built yet).
Requires JDK 25+.
*/
public class C_FlexibleConstructorBodies {

    static class Person {
        final String name;
        Person(String name) { this.name = name; }
    }

    static class Employee extends Person {
        final int salary;

        Employee(String name, int salary) {
            if (salary < 0) throw new IllegalArgumentException("salary must be >= 0"); // before super()!
            String cleanName = name.strip();
            super(cleanName);
            this.salary = salary;
        }
    }

    // Before Java 25 you needed a static helper to do the same:
    static class OldEmployee extends Person {
        OldEmployee(String name) {
            super(validate(name));
        }

        private static String validate(String name) {
            if (name.isBlank()) throw new IllegalArgumentException("name required");
            return name.strip();
        }
    }

    public static void main(String[] args) {
        System.out.println(new Employee("  Asha ", 50_000).name); // Asha
        try {
            new Employee("Ravi", -1);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage()); // salary must be >= 0
        }
        System.out.println(new OldEmployee(" Meena ").name); // Meena
    }
}
