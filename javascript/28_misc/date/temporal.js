/*
Temporal - the modern replacement for Date (Stage 3 proposal)
Not built into Node 20/22/24 yet. Firefox 139+ has it. To try it now:
  npm install @js-temporal/polyfill
Problems with Date that Temporal fixes:
  - months start at 0 (new Date(2026, 0, 1) is January)
  - Date objects are mutable
  - only local time or UTC, no other time zones
  - no separate types for "just a date" or "just a time"
*/
let Temporal = globalThis.Temporal;
if (!Temporal) {
  try {
    ({ Temporal } = require("@js-temporal/polyfill"));
  } catch {
    console.log("Temporal is not available. Run: npm install @js-temporal/polyfill");
    process.exit(0);
  }
}

console.log("<<<< plain date (no time, no time zone) >>>>");
const birthday = Temporal.PlainDate.from("1995-08-15");
console.log(birthday.month);// 8 (months start at 1!)
console.log(birthday.add({ years: 1 }).toString());// 1996-08-15
console.log(birthday.toString());// 1995-08-15 (immutable: add() returned a new object)

console.log("<<<< difference between dates >>>>");
const today = Temporal.Now.plainDateISO();
const age = birthday.until(today, { largestUnit: "years" });
console.log(`${age.years} years, ${age.months} months, ${age.days} days`);

console.log("<<<< time zones >>>>");
const meeting = Temporal.ZonedDateTime.from("2026-10-13T10:00[Asia/Kolkata]");
console.log(meeting.withTimeZone("America/New_York").toString());
// 2026-10-13T00:30:00-04:00[America/New_York]

console.log("<<<< durations >>>>");
const d = Temporal.Duration.from({ hours: 1, minutes: 90 });
console.log(d.round({ largestUnit: "hours" }).toString());// PT2H30M
