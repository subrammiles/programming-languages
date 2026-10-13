package ch07_enums;

/*
enum - a type with a fixed set of named constants.
Safer than int or String constants: the compiler rejects any other value.
Every enum gets: values(), valueOf(String), name(), ordinal(), compareTo()
*/
public class A_EnumBasics {

    enum Day { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY }

    public static void main(String[] args) {
        Day today = Day.SATURDAY;
        System.out.println(today);            // SATURDAY
        System.out.println(today.name());     // SATURDAY
        System.out.println(today.ordinal());  // 5 (position, starts at 0)

        for (Day d : Day.values()) {
            System.out.print(d + " ");
        }
        System.out.println();

        Day parsed = Day.valueOf("MONDAY");
        System.out.println(parsed == Day.MONDAY); // true -> use == to compare enums

        try {
            Day.valueOf("FUNDAY");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage()); // No enum constant ...Day.FUNDAY
        }

        System.out.println(Day.MONDAY.compareTo(Day.FRIDAY)); // -4
    }
}
