/*
includes / startsWith / endsWith return true or false.
Easier to read than indexOf(...) !== -1
All are case-sensitive.
*/
const file = "report-2026.pdf";

console.log(file.includes("2026"));// true
console.log(file.startsWith("report"));// true
console.log(file.endsWith(".pdf"));// true
console.log(file.includes("Report"));// false (case-sensitive)

// Optional position argument
console.log(file.startsWith("2026", 7));// true (starts checking at index 7)
