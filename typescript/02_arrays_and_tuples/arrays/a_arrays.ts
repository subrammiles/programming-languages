/*
Typed arrays: every element must have the declared type.
 string[]          (or Array<string>)
*/

const names: string[] = [];
names.push("Dylan", "Subbu", "Trump");
// names.push(3); // error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
console.log(names);

const numbers: Array<number> = [10, 16, 56]; // the generic form means the same thing
console.log(numbers.map((n) => n * 2)); // [ 20, 32, 112 ] -> n is known to be a number

const flags: boolean[] = [true, false, true];
console.log(flags.filter(Boolean).length); // 2

// With "noUncheckedIndexedAccess" (see tsconfig.json), an index might be out of range:
const first = names[0]; // string | undefined
console.log(first?.toUpperCase()); // DYLAN
