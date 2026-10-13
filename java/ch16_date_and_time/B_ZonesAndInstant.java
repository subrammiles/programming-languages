package ch16_date_and_time;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

/*
Time zones
 Instant         -> a point on the timeline in UTC (use for timestamps, logs, databases)
 ZonedDateTime   -> date-time in a named zone, e.g. Asia/Kolkata (handles daylight saving)
 OffsetDateTime  -> date-time with a fixed offset, e.g. +05:30 (common in APIs / JSON)
Rule of thumb: store Instant / UTC, convert to a zone only to show it to a person.
*/
public class B_ZonesAndInstant {

    public static void main(String[] args) {
        Instant now = Instant.now();
        System.out.println(now);                          // 2026-10-13T08:30:00.123Z (Z = UTC)
        System.out.println(now.toEpochMilli() > 0);       // true

        ZonedDateTime india = ZonedDateTime.of(LocalDateTime.of(2026, 10, 13, 10, 0), ZoneId.of("Asia/Kolkata"));
        ZonedDateTime newYork = india.withZoneSameInstant(ZoneId.of("America/New_York"));
        ZonedDateTime london = india.withZoneSameInstant(ZoneId.of("Europe/London"));
        System.out.println(india);    // 2026-10-13T10:00+05:30[Asia/Kolkata]
        System.out.println(newYork);  // 2026-10-13T00:30-04:00[America/New_York]
        System.out.println(london);   // 2026-10-13T05:30+01:00[Europe/London]
        System.out.println(india.toInstant().equals(newYork.toInstant())); // true -> same moment

        // Daylight saving: 2026-03-08 02:00 does not exist in New York (clocks jump to 03:00)
        ZonedDateTime gap = ZonedDateTime.of(LocalDateTime.of(2026, 3, 8, 2, 30), ZoneId.of("America/New_York"));
        System.out.println(gap);      // 2026-03-08T03:30-04:00[America/New_York]

        OffsetDateTime fromApi = OffsetDateTime.parse("2026-10-13T10:00:00+05:30");
        System.out.println(fromApi.withOffsetSameInstant(ZoneOffset.UTC)); // 2026-10-13T04:30Z
    }
}
