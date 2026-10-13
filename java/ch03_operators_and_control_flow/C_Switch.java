package ch03_operators_and_control_flow;

/*
switch
 1. Classic switch statement: needs break, otherwise it "falls through".
 2. Switch expressions (Java 14): arrow labels, no fall-through, returns a value.
 3. yield returns a value from a block inside a switch expression.
Works with: int, char, String, enums, and (Java 21) any object with patterns, see ch09.
*/
public class C_Switch {

    public static void main(String[] args) {
        System.out.println("<<<< classic switch >>>>");
        int day = 6;
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 6:
            case 7:
                System.out.println("Weekend");
                break;
            default:
                System.out.println("Weekday");
        }

        System.out.println("<<<< forgetting break: fall-through >>>>");
        switch (2) {
            case 1:
                System.out.println("one");
            case 2:
                System.out.println("two");
            case 3:
                System.out.println("three"); // also runs!
        }

        System.out.println("<<<< switch expression (Java 14) >>>>");
        String type = switch (day) {
            case 1, 2, 3, 4, 5 -> "Weekday";
            case 6, 7 -> "Weekend";
            default -> throw new IllegalArgumentException("bad day: " + day);
        };
        System.out.println(type); // Weekend

        System.out.println("<<<< yield >>>>");
        String fruit = "mango";
        int price = switch (fruit) {
            case "apple" -> 120;
            case "mango" -> {
                int base = 100;
                int seasonalExtra = 20;
                yield base + seasonalExtra;
            }
            default -> 0;
        };
        System.out.println(price); // 120
    }
}
