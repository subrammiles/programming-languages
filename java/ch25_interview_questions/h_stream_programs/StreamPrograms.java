package ch25_interview_questions.h_stream_programs;

import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.TreeMap;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/*
"Java 8 Streams" interview questions - asked in almost every Java interview.
Most use an Employee list. The concepts are explained in ch13_lambdas and ch14_streams.
*/
public class StreamPrograms {

    record Employee(String name, String dept, double salary, int age) {}

    static final List<Employee> EMPLOYEES = List.of(
            new Employee("Ann", "IT", 9000, 30),
            new Employee("Bo", "HR", 5000, 45),
            new Employee("Cy", "IT", 7000, 25),
            new Employee("Dee", "Sales", 6000, 38),
            new Employee("Eve", "IT", 9000, 41),
            new Employee("Finn", "HR", 5500, 29));

    public static void main(String[] args) {
        List<Integer> nums = List.of(5, 3, 8, 3, 9, 1, 8, 10);

        // 1. Even numbers, squared
        System.out.println(nums.stream().filter(n -> n % 2 == 0).map(n -> n * n).toList());   // [64, 64, 100]

        // 2. Duplicates
        Set<Integer> seen = new java.util.HashSet<>();
        System.out.println(nums.stream().filter(n -> !seen.add(n)).collect(Collectors.toSet()));   // [3, 8]

        // 3. Max, min, sum, average
        System.out.println(nums.stream().max(Integer::compare).get() + " " + nums.stream().mapToInt(Integer::intValue).sum());   // 10 47
        System.out.println(nums.stream().mapToInt(Integer::intValue).summaryStatistics());
        // IntSummaryStatistics{count=8, sum=47, min=1, average=5.875000, max=10}

        // 4. Second highest distinct number
        System.out.println(nums.stream().distinct().sorted(Comparator.reverseOrder()).skip(1).findFirst().orElse(null));   // 9

        // 5. First non-repeated character in a string
        String text = "swiss cheese";
        Optional<Character> firstUnique = text.chars().mapToObj(c -> (char) c)
                .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()))
                .entrySet().stream().filter(e -> e.getValue() == 1).map(Map.Entry::getKey).findFirst();
        System.out.println(firstUnique.orElse('-'));          // w

        // 6. Word frequency, sorted by count descending
        String sentence = "the cat and the dog and the bird";
        Map<String, Long> freq = Arrays.stream(sentence.split(" "))
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        System.out.println(freq.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed().thenComparing(Map.Entry.comparingByKey()))
                .map(e -> e.getKey() + "=" + e.getValue()).toList());   // [the=3, and=2, bird=1, cat=1, dog=1]

        // 7. Employees grouped by department (a TreeMap keeps the keys sorted)
        Map<String, List<String>> namesByDept = EMPLOYEES.stream().collect(Collectors.groupingBy(Employee::dept,
                TreeMap::new, Collectors.mapping(Employee::name, Collectors.toList())));
        System.out.println(namesByDept);                      // {HR=[Bo, Finn], IT=[Ann, Cy, Eve], Sales=[Dee]}

        // 8. Count and average salary per department
        Map<String, Long> countByDept = EMPLOYEES.stream()
                .collect(Collectors.groupingBy(Employee::dept, TreeMap::new, Collectors.counting()));
        System.out.println(countByDept);                      // {HR=2, IT=3, Sales=1}
        Map<String, Double> avgByDept = EMPLOYEES.stream()
                .collect(Collectors.groupingBy(Employee::dept, TreeMap::new, Collectors.averagingDouble(Employee::salary)));
        System.out.println(avgByDept);                        // {HR=5250.0, IT=8333.333333333334, Sales=6000.0}

        // 9. Highest paid employee per department
        Map<String, String> topPaid = EMPLOYEES.stream().collect(Collectors.groupingBy(Employee::dept, TreeMap::new,
                Collectors.collectingAndThen(Collectors.maxBy(Comparator.comparingDouble(Employee::salary)
                        .thenComparing(Employee::name, Comparator.reverseOrder())), e -> e.get().name())));
        System.out.println(topPaid);                          // {HR=Finn, IT=Ann, Sales=Dee}

        // 10. Second highest salary
        System.out.println(EMPLOYEES.stream().map(Employee::salary).distinct()
                .sorted(Comparator.reverseOrder()).skip(1).findFirst().get());   // 7000.0

        // 11. Partition: older than 35 or not
        System.out.println(EMPLOYEES.stream().collect(Collectors.partitioningBy(e -> e.age() > 35,
                Collectors.mapping(Employee::name, Collectors.toList()))));   // {false=[Ann, Cy, Finn], true=[Bo, Dee, Eve]}

        // 12. Sort by salary desc, then name
        System.out.println(EMPLOYEES.stream()
                .sorted(Comparator.comparingDouble(Employee::salary).reversed().thenComparing(Employee::name))
                .map(Employee::name).limit(3).toList());      // [Ann, Eve, Cy]

        // 13. Names joined, total salary, any / all / none
        System.out.println(EMPLOYEES.stream().map(Employee::name).collect(Collectors.joining(", ", "[", "]")));
        // [Ann, Bo, Cy, Dee, Eve, Finn]
        System.out.println(EMPLOYEES.stream().mapToDouble(Employee::salary).sum());     // 41500.0
        System.out.println(EMPLOYEES.stream().anyMatch(e -> e.salary() > 8000) + " "
                + EMPLOYEES.stream().allMatch(e -> e.age() > 18) + " "
                + EMPLOYEES.stream().noneMatch(e -> e.dept().equals("Ops")));         // true true true

        // 14. List to Map (name -> salary); handle duplicate keys with a merge function
        Map<String, Double> byName = EMPLOYEES.stream().collect(Collectors.toMap(Employee::name, Employee::salary, (a, b) -> a, LinkedHashMap::new));
        System.out.println(byName.get("Cy"));                 // 7000.0

        // 15. flatMap: flatten nested lists
        List<List<String>> nested = List.of(List.of("a", "b"), List.of("c"), List.of("d", "e"));
        System.out.println(nested.stream().flatMap(List::stream).map(String::toUpperCase).toList());   // [A, B, C, D, E]

        // 16. Reverse each word, and the longest word
        System.out.println(Arrays.stream("java streams rock".split(" "))
                .map(w -> new StringBuilder(w).reverse()).collect(Collectors.joining(" ")));   // avaj smaerts kcor
        System.out.println(Stream.of("kiwi", "banana", "fig").max(Comparator.comparingInt(String::length)).get());   // banana

        // 17. Sum of digits, and generating sequences
        System.out.println(String.valueOf(9875).chars().map(Character::getNumericValue).sum());   // 29
        System.out.println(Stream.iterate(new long[] {0, 1}, f -> new long[] {f[1], f[0] + f[1]})
                .limit(10).map(f -> f[0]).toList());          // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
    }
}
