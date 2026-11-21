/*
Intl: language-sensitive formatting (internationalisation)
Built into every browser and Node. Use it instead of formatting by hand.
Each formatter takes a locale ("en-US", "de-DE", "ja-JP", "hi-IN"...) and options.
Create a formatter once and reuse it: creating them is slower than using them.
*/

console.log("<<<< numbers >>>>");
const big = 1234567.891;
console.log(new Intl.NumberFormat("en-US").format(big));// 1,234,567.891
console.log(new Intl.NumberFormat("de-DE").format(big));// 1.234.567,891
console.log(new Intl.NumberFormat("en-IN").format(big));// 12,34,567.891   (lakh grouping)
console.log(big.toLocaleString("fr-FR"));// 1 234 567,891   (shortcut; the spaces are narrow no-break spaces)

console.log("<<<< currency, percent, units, compact >>>>");
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const eur = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const jpy = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" });
console.log(usd.format(1999.5), eur.format(1999.5), jpy.format(1999.5));// $1,999.50 1.999,50 € ￥2,000
console.log(new Intl.NumberFormat("en", { style: "percent" }).format(0.256));// 26%
console.log(new Intl.NumberFormat("en", { style: "unit", unit: "kilometer-per-hour" }).format(88));// 88 km/h
console.log(new Intl.NumberFormat("en", { notation: "compact" }).format(1_530_000));// 1.5M
console.log(new Intl.NumberFormat("en", { maximumFractionDigits: 1 }).format(3.14159));// 3.1

console.log("<<<< dates and times >>>>");
const date = new Date(Date.UTC(2026, 2, 15, 14, 30));
const fmt = (locale, options) => new Intl.DateTimeFormat(locale, { timeZone: "UTC", ...options }).format(date);
console.log(fmt("en-US"));// 3/15/2026
console.log(fmt("en-GB"));// 15/03/2026
console.log(fmt("de-DE", { dateStyle: "full" }));// Sonntag, 15. März 2026
console.log(fmt("en-US", { dateStyle: "medium", timeStyle: "short" }));// Mar 15, 2026, 2:30 PM
console.log(fmt("en-US", { weekday: "short", month: "long", day: "numeric" }));// Sun, March 15
console.log(new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Tokyo", timeStyle: "short" }).format(date));// 11:30 PM

console.log("<<<< relative time: '3 days ago' >>>>");
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
console.log(rtf.format(-3, "day"), "|", rtf.format(-1, "day"), "|", rtf.format(2, "week"));// 3 days ago | yesterday | in 2 weeks

console.log("<<<< plural rules: 1 item / 2 items >>>>");
const plural = new Intl.PluralRules("en");
const itemLabel = (n) => `${n} ${plural.select(n) === "one" ? "item" : "items"}`;
console.log(itemLabel(1), "|", itemLabel(5));// 1 item | 5 items
const ordinal = new Intl.PluralRules("en", { type: "ordinal" });
const suffix = { one: "st", two: "nd", few: "rd", other: "th" };
console.log([1, 2, 3, 4, 11, 22].map((n) => n + suffix[ordinal.select(n)]).join(" "));// 1st 2nd 3rd 4th 11th 22nd

console.log("<<<< lists >>>>");
const list = ["Ann", "Bo", "Cy"];
console.log(new Intl.ListFormat("en", { type: "conjunction" }).format(list));// Ann, Bo, and Cy
console.log(new Intl.ListFormat("en", { type: "disjunction" }).format(list));// Ann, Bo, or Cy

console.log("<<<< sorting text correctly (Collator) >>>>");
const words = ["zebra", "Äpfel", "apple", "item10", "item2"];
console.log(words.toSorted());// [ 'apple', 'item10', 'item2', 'zebra', 'Äpfel' ]   (by code unit)
console.log(words.toSorted(new Intl.Collator("de", { numeric: true }).compare));// [ 'Äpfel', 'apple', 'item2', 'item10', 'zebra' ]
// Ä sorts with A, and numeric: true puts item2 before item10

console.log("<<<< durations (ES2025) >>>>");
console.log(new Intl.DurationFormat("en", { style: "long" }).format({ hours: 1, minutes: 46 }));// 1 hour, 46 minutes
