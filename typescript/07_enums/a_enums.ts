/*
enum: a named set of constants.
enums GENERATE JavaScript code (they're not just types), so Node's plain type stripping
can't run this file. Run it with:
  node --experimental-transform-types 07_enums/a_enums.ts
Many teams now prefer "as const" objects (b_as_const_alternative.ts), which need no extra code.
*/

// Numeric enum: values start at 0 and count up
enum Days {
  Sunday,
  Monday,
}

// You can choose the starting value
enum Days2 {
  Sunday = 1,
  Monday,
}

// String enum: every member needs a value; easier to read in logs and JSON
enum Status {
  Active = "ACTIVE",
  Suspended = "SUSPENDED",
}

console.log(Days.Sunday, Days.Monday); // 0 1
console.log(Days2.Sunday, Days2.Monday); // 1 2
console.log(Days[0]); // Sunday -> numeric enums also map values back to names
console.log(Status.Active); // ACTIVE

function canLogIn(status: Status): boolean {
  return status === Status.Active;
}
console.log(canLogIn(Status.Active), canLogIn(Status.Suspended)); // true false
// canLogIn("ACTIVE"); // error TS2345: a plain string is not a Status
