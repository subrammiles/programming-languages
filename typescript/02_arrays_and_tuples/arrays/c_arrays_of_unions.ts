/*
Arrays of union types: each element can be any of the listed types.
 (string | number)[]   <- the parentheses matter
 string | number[]     <- means "a string OR an array of numbers"
*/

const ids: (string | number)[] = [];
ids.push(1, "Subbu");
console.log(ids);

const mixed: (string | number | boolean)[] = [true, "Subbu", 123];
for (const item of mixed) {
  if (typeof item === "number") console.log("number", item.toFixed(1));
  else console.log(typeof item, item);
}
