package ch12_collections.sorting;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/*
Sorting objects
 Comparable  -> the class defines its ONE natural order (compareTo)
 Comparator  -> any number of external orders, built with:
   Comparator.comparing(...), thenComparing(...), reversed(),
   nullsFirst/nullsLast, comparingInt/Double
*/
public class A_ComparableAndComparator {

    record Student(String name, int marks, String city) implements Comparable<Student> {
        @Override
        public int compareTo(Student other) {      // natural order: by name
            return name.compareTo(other.name);
        }
    }

    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(List.of(
                new Student("Ravi", 85, "Pune"),
                new Student("Asha", 92, "Delhi"),
                new Student("Meena", 85, "Delhi"),
                new Student("Kiran", 70, "Pune")));

        students.sort(null); // null -> natural order (Comparable)
        System.out.println(students.stream().map(Student::name).toList()); // [Asha, Kiran, Meena, Ravi]

        // Highest marks first, ties broken by name
        students.sort(Comparator.comparingInt(Student::marks).reversed().thenComparing(Student::name));
        students.forEach(s -> System.out.println(s.marks() + " " + s.name()));
        // 92 Asha
        // 85 Meena
        // 85 Ravi
        // 70 Kiran

        // By city, then marks descending
        students.sort(Comparator.comparing(Student::city)
                .thenComparing(Student::marks, Comparator.reverseOrder()));
        System.out.println(students.stream().map(s -> s.city() + ":" + s.name()).toList());
        // [Delhi:Asha, Delhi:Meena, Pune:Ravi, Pune:Kiran]

        // Nulls
        List<String> names = new ArrayList<>(java.util.Arrays.asList("b", null, "a"));
        names.sort(Comparator.nullsLast(Comparator.naturalOrder()));
        System.out.println(names); // [a, b, null]
    }
}
