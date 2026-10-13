/*
What's new in TypeScript, 4.9 → 7.0 - one small example per release.
Run: node 18_whats_new/whats_new.ts
*/

console.log("— 4.9: satisfies —");
const palette = { primary: "#0af", spacing: [4, 8] } satisfies Record<string, string | number[]>;
console.log(palette.primary.toUpperCase(), palette.spacing.length); // keeps the exact types

console.log("— 5.0: const type parameters (and standard decorators, see 14_decorators) —");
const tuple = <const T extends readonly unknown[]>(...items: T): T => items;
const t = tuple("a", 1, true); // readonly ["a", 1, true]
console.log(t);

console.log("— 5.2: using / await using —");
{
  using _timer = { [Symbol.dispose]: () => console.log("disposed at end of block") };
  console.log("inside block");
}

console.log("— 5.4: NoInfer —");
function pick<T extends string>(options: T[], fallback: NoInfer<T>): T {
  return options[0] ?? fallback;
}
console.log(pick(["red", "green"], "red")); // "blue" as the fallback would be an error

console.log("— 5.5: inferred type predicates, checked regular expressions —");
const values = [1, null, 2, undefined, 3];
const numbers = values.filter((v) => v != null); // number[] (no manual "v is number" needed)
console.log(numbers.map((n) => n * 10));
const date = /(?<year>\d{4})-(?<month>\d{2})/; // TypeScript now checks regex syntax:
// const bad = /(?<year>\d{4}/;                // error TS1005: ')' expected.
console.log("2026-10".match(date)?.groups?.year);

console.log("— 5.6/5.7: iterator helper types, checks for always-true conditions —");
const evens = [1, 2, 3, 4, 5, 6].values().filter((n) => n % 2 === 0).map((n) => n * n);
console.log([...evens]); // [ 4, 16, 36 ] -> Iterator helpers (ES2025) are fully typed
// if (/regex/) { }  // error TS2872: This kind of expression is always truthy.

console.log("— 5.8: --erasableSyntaxOnly —");
console.log("forbids enums, namespaces and parameter properties, for code Node runs directly");

console.log("— 6.0 / 7.0: cleanup and the native compiler —");
console.log("strict is on by default; ES5 target, baseUrl, outFile and moduleResolution node10 are removed");
console.log("TypeScript 7 is rewritten in Go: type checking is about 10x faster");
