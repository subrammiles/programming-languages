package ch16_date_and_time;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.FormatStyle;
import java.util.Locale;

/*
DateTimeFormatter - converting dates to and from text
 dd day   MM month number   MMM short month   MMMM full month   yyyy year
 HH 24-hour   hh 12-hour   mm minutes   ss seconds   a AM/PM   EEEE weekday
Careful: MM = month, mm = minutes. yyyy = year, YYYY = "week year" (a classic bug in late December).
*/
public class D_Formatting {

    public static void main(String[] args) {
        LocalDateTime dt = LocalDateTime.of(2026, 10, 13, 14, 5);

        System.out.println(dt.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));            // 13/10/2026
        System.out.println(dt.format(DateTimeFormatter.ofPattern("EEEE, d MMMM yyyy", Locale.ENGLISH))); // Tuesday, 13 October 2026
        System.out.println(dt.format(DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH)));          // 02:05 PM
        System.out.println(dt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));               // 2026-10-13T14:05:00
        System.out.println(dt.toLocalDate().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM).withLocale(Locale.US))); // Oct 13, 2026

        LocalDate parsed = LocalDate.parse("25-12-2026", DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        System.out.println(parsed); // 2026-12-25

        try {
            LocalDate.parse("2026/12/25");
        } catch (DateTimeParseException e) {
            System.out.println("could not parse: " + e.getParsedString());
        }

        // The YYYY bug: Monday 2025-12-29 belongs to week 1 of "week year" 2026
        LocalDate lateDec = LocalDate.of(2025, 12, 29);
        System.out.println(lateDec.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))); // 2025-12-29
        System.out.println(lateDec.format(DateTimeFormatter.ofPattern("YYYY-MM-dd", Locale.UK))); // 2026-12-29 !
    }
}
