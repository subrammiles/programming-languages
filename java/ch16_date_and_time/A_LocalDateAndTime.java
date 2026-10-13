package ch16_date_and_time;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;

/*
java.time (Java 8) replaces the old java.util.Date and Calendar.
All java.time classes are IMMUTABLE: methods like plusDays() return a new object.
 LocalDate      -> date only       2026-10-13
 LocalTime      -> time only       14:30
 LocalDateTime  -> date + time, no time zone
Months are 1-12 (not 0-11 like the old Date).
*/
public class A_LocalDateAndTime {

    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        LocalDate birthday = LocalDate.of(1995, Month.AUGUST, 15);
        LocalDate parsed = LocalDate.parse("2026-01-31");

        System.out.println(birthday);                  // 1995-08-15
        System.out.println(birthday.getDayOfWeek());   // TUESDAY
        System.out.println(birthday.isLeapYear());     // false

        System.out.println(parsed.plusMonths(1));      // 2026-02-28 (clamped to the last valid day)
        System.out.println(parsed.minusWeeks(2));      // 2026-01-17
        System.out.println(parsed.withDayOfMonth(1));  // 2026-01-01

        System.out.println(ChronoUnit.DAYS.between(birthday, today) + " days old");

        // TemporalAdjusters for "next Monday", "last day of month" ...
        System.out.println(parsed.with(TemporalAdjusters.next(DayOfWeek.MONDAY)));      // 2026-02-02
        System.out.println(parsed.with(TemporalAdjusters.lastDayOfMonth()));           // 2026-01-31
        System.out.println(parsed.with(TemporalAdjusters.firstInMonth(DayOfWeek.FRIDAY))); // 2026-01-02

        LocalTime meeting = LocalTime.of(14, 30);
        System.out.println(meeting.plusMinutes(45));   // 15:15
        System.out.println(meeting.isBefore(LocalTime.NOON)); // false

        LocalDateTime dt = LocalDateTime.of(birthday, meeting);
        System.out.println(dt);                        // 1995-08-15T14:30

        // Comparing
        System.out.println(birthday.isBefore(today));  // true
        System.out.println(LocalDate.of(2026, 1, 1).equals(LocalDate.parse("2026-01-01"))); // true
    }
}
