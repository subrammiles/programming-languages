package ch06_oop.o_object_class;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/*
How to write an immutable class (a classic interview question)
  1. declare the class final (so no subclass can add mutable state)
  2. make all fields private and final
  3. no setters
  4. DEFENSIVE COPIES: copy mutable inputs in the constructor, and
     never hand out internal mutable objects from getters
  5. "modifying" methods return a NEW object (like String.toUpperCase)

Benefits: thread-safe without locks, safe as HashMap keys, easy to reason about.
JDK examples: String, Integer, LocalDate, BigDecimal, List.of(...).
Since Java 16, a record + defensive copies in the compact constructor does most of this.
*/
public class C_ImmutableClass {

    // NOT immutable: final fields, but the list and date can still be changed from outside
    static final class LeakyEmployee {
        private final String name;
        private final List<String> skills;
        private final Date joined;

        LeakyEmployee(String name, List<String> skills, Date joined) {
            this.name = name;
            this.skills = skills;          // stores the caller's list
            this.joined = joined;
        }
        List<String> skills() { return skills; }   // hands out the internal list
        Date joined() { return joined; }
    }

    // Immutable
    static final class Employee {
        private final String name;
        private final List<String> skills;
        private final Date joined;

        Employee(String name, List<String> skills, Date joined) {
            this.name = name;
            this.skills = List.copyOf(skills);          // unmodifiable copy
            this.joined = new Date(joined.getTime());   // defensive copy of a mutable object
        }
        String name() { return name; }
        List<String> skills() { return skills; }        // safe: already unmodifiable
        Date joined() { return new Date(joined.getTime()); }

        Employee withSkill(String skill) {              // "wither": returns a new object
            List<String> more = new ArrayList<>(skills);
            more.add(skill);
            return new Employee(name, more, joined);
        }
        @Override public String toString() { return name + skills; }
    }

    // The modern way: a record with a compact constructor
    record Project(String title, List<String> tags) {
        Project {
            tags = List.copyOf(tags);
        }
    }

    public static void main(String[] args) {
        List<String> skills = new ArrayList<>(List.of("java"));
        Date date = new Date(0);

        LeakyEmployee leaky = new LeakyEmployee("Ann", skills, date);
        skills.add("hacked");                   // changes leaky's internal state
        leaky.joined().setTime(999_999_999L);
        System.out.println(leaky.skills() + " " + (leaky.joined().getTime() != 0));   // [java, hacked] true

        skills = new ArrayList<>(List.of("java"));
        Employee emp = new Employee("Ann", skills, new Date(0));
        skills.add("hacked");                   // no effect: emp has its own copy
        emp.joined().setTime(999_999_999L);     // no effect: getter returned a copy
        System.out.println(emp + " " + emp.joined().getTime());       // Ann[java] 0

        try {
            emp.skills().add("hacked");
        } catch (UnsupportedOperationException e) {
            System.out.println("UnsupportedOperationException");      // UnsupportedOperationException
        }

        Employee promoted = emp.withSkill("kotlin");
        System.out.println(emp + " -> " + promoted);                  // Ann[java] -> Ann[java, kotlin]

        List<String> tags = new ArrayList<>(List.of("web"));
        Project project = new Project("site", tags);
        tags.add("changed");
        System.out.println(project);                                  // Project[title=site, tags=[web]]
    }
}
