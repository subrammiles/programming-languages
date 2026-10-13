package main

import (
	"fmt"
	"time"
)

/*
time - instants, durations, formatting, timers
Go formats dates with a REFERENCE TIME instead of %Y-%m-%d codes:
	Mon Jan 2 15:04:05 MST 2006   (1 2 3 4 5 6 7: month day hour minute second year zone)
*/

func timeBasics() {
	t := time.Date(2026, time.October, 13, 14, 30, 0, 0, time.UTC)
	fmt.Println(t)                                    // 2026-10-13 14:30:00 +0000 UTC
	fmt.Println(t.Format("02/01/2006 3:04 PM"))       // 13/10/2026 2:30 PM
	fmt.Println(t.Format(time.RFC3339))               // 2026-10-13T14:30:00Z
	fmt.Println(t.Format(time.DateOnly), t.Weekday()) // 2026-10-13 Tuesday

	parsed, err := time.Parse("2006-01-02", "2026-12-25")
	fmt.Println(parsed.Sub(t).Round(time.Hour), err) // 1738h0m0s <nil>

	fmt.Println(t.Add(90 * time.Minute).Format(time.Kitchen)) // 4:00PM
	fmt.Println(t.AddDate(0, 1, 0).Format(time.DateOnly))     // 2026-11-13

	d := 2*time.Hour + 15*time.Minute
	fmt.Println(d, d.Minutes()) // 2h15m0s 135

	ist, _ := time.LoadLocation("Asia/Kolkata")
	fmt.Println(t.In(ist).Format("15:04 MST")) // 20:00 IST

	start := time.Now()
	time.Sleep(20 * time.Millisecond)
	fmt.Println(time.Since(start) >= 20*time.Millisecond) // true
}
