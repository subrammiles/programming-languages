package ch14_streams;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

/*
Collectors - turning a stream into a collection or summary
 toList, toSet, toMap, joining, counting, summingInt, averagingDouble,
 groupingBy, partitioningBy, mapping, summarizingInt, teeing (Java 12)
*/
public class E_Collectors {

    record Employee(String name, String dept, double salary, int age) {}

    public static void main(String[] args) {
        List<Employee> staff = List.of(
                new Employee("Asha", "IT", 90_000, 30),
                new Employee("Ravi", "IT", 70_000, 25),
                new Employee("Meena", "HR", 60_000, 41),
                new Employee("Kiran", "Sales", 55_000, 35),
                new Employee("John", "Sales", 65_000, 28));

        System.out.println(staff.stream().map(Employee::name).collect(Collectors.joining(", ", "[", "]")));
        // [Asha, Ravi, Meena, Kiran, John]

        Map<String, Double> salaryByName = staff.stream()
                .collect(Collectors.toMap(Employee::name, Employee::salary));
        System.out.println(salaryByName.get("Meena")); // 60000.0

        // groupingBy -> Map<key, List<value>>
        Map<String, List<String>> namesByDept = staff.stream().collect(
                Collectors.groupingBy(Employee::dept, TreeMap::new,
                        Collectors.mapping(Employee::name, Collectors.toList())));
        System.out.println(namesByDept); // {HR=[Meena], IT=[Asha, Ravi], Sales=[Kiran, John]}

        Map<String, Long> countByDept = staff.stream()
                .collect(Collectors.groupingBy(Employee::dept, TreeMap::new, Collectors.counting()));
        System.out.println(countByDept); // {HR=1, IT=2, Sales=2}

        Map<String, Double> avgSalary = staff.stream()
                .collect(Collectors.groupingBy(Employee::dept, TreeMap::new, Collectors.averagingDouble(Employee::salary)));
        System.out.println(avgSalary);   // {HR=60000.0, IT=80000.0, Sales=60000.0}

        // partitioningBy -> Map<Boolean, List>
        Map<Boolean, List<String>> over30 = staff.stream().collect(
                Collectors.partitioningBy(e -> e.age() > 30, Collectors.mapping(Employee::name, Collectors.toList())));
        System.out.println(over30); // {false=[Asha, Ravi, John], true=[Meena, Kiran]}

        // summary statistics
        var stats = staff.stream().collect(Collectors.summarizingDouble(Employee::salary));
        System.out.printf("min=%.0f max=%.0f avg=%.0f%n", stats.getMin(), stats.getMax(), stats.getAverage());
        // min=55000 max=90000 avg=68000

        // teeing: two collectors at once, then combine
        String range = staff.stream().collect(Collectors.teeing(
                Collectors.minBy((a, b) -> Integer.compare(a.age(), b.age())),
                Collectors.maxBy((a, b) -> Integer.compare(a.age(), b.age())),
                (youngest, oldest) -> youngest.get().name() + " to " + oldest.get().name()));
        System.out.println(range); // Ravi to Meena
    }
}
