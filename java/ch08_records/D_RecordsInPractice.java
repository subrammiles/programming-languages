package ch08_records;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/*
Where records shine:
 1. DTOs / API responses
 2. Map keys (equals and hashCode are correct for free)
 3. Local records: a temporary type inside a method
 4. Implementing interfaces
*/
public class D_RecordsInPractice {

    interface Shape { double area(); }

    record Circle(double r) implements Shape {
        public double area() { return Math.PI * r * r; }
    }

    record Square(double side) implements Shape {
        public double area() { return side * side; }
    }

    record Employee(String name, String dept, double salary) {}

    public static void main(String[] args) {
        List<Shape> shapes = List.of(new Circle(1), new Square(2));
        shapes.forEach(s -> System.out.printf("%s area=%.2f%n", s, s.area()));

        // Records as map keys
        record Cell(int row, int col) {}
        Map<Cell, String> board = Map.of(new Cell(0, 0), "X", new Cell(1, 1), "O");
        System.out.println(board.get(new Cell(1, 1))); // O

        // Local record to hold an intermediate result
        List<Employee> staff = List.of(
                new Employee("Asha", "IT", 90_000),
                new Employee("Ravi", "IT", 70_000),
                new Employee("Meena", "HR", 60_000));

        record DeptAvg(String dept, double avg) {}
        staff.stream()
                .collect(Collectors.groupingBy(Employee::dept, Collectors.averagingDouble(Employee::salary)))
                .entrySet().stream()
                .map(e -> new DeptAvg(e.getKey(), e.getValue()))
                .sorted(Comparator.comparing(DeptAvg::avg).reversed())
                .forEach(System.out::println);
        // DeptAvg[dept=IT, avg=80000.0]
        // DeptAvg[dept=HR, avg=60000.0]
    }
}
