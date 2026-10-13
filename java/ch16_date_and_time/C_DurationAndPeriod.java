package ch16_date_and_time;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

/*
 Duration -> time-based amount: hours, minutes, seconds, nanos   (use with Instant / LocalTime)
 Period   -> date-based amount: years, months, days               (use with LocalDate)
*/
public class C_DurationAndPeriod {

    public static void main(String[] args) {
        Duration d = Duration.ofMinutes(135);
        System.out.println(d);                 // PT2H15M (ISO-8601 format)
        System.out.println(d.toHours());       // 2
        System.out.println(d.toMinutesPart()); // 15

        LocalDateTime start = LocalDateTime.of(2026, 10, 13, 9, 0);
        LocalDateTime end = LocalDateTime.of(2026, 10, 13, 17, 45);
        System.out.println(Duration.between(start, end)); // PT8H45M

        Period age = Period.between(LocalDate.of(1995, 8, 15), LocalDate.of(2026, 10, 13));
        System.out.println(age);  // P31Y1M28D
        System.out.printf("%d years, %d months, %d days%n", age.getYears(), age.getMonths(), age.getDays());

        LocalDate due = LocalDate.of(2026, 1, 31).plus(Period.ofMonths(1));
        System.out.println(due);  // 2026-02-28

        // Measuring elapsed time: use System.nanoTime() or Instant, not LocalDateTime
        long t = System.nanoTime();
        for (int i = 0; i < 1_000_000; i++) Math.sqrt(i);
        System.out.println("took " + Duration.ofNanos(System.nanoTime() - t).toMillis() + " ms");
    }
}
