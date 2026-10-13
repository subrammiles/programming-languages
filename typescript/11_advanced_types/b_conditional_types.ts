/*
Conditional types: T extends U ? X : Y   - a type-level if/else
 infer R  captures part of a type inside the condition
 Distributive: on a union, the condition runs on EACH member
Most built-in utility types (ReturnType, Exclude, Awaited ...) are written this way.
*/

type IsString<T> = T extends string ? "yes" : "no";
const a: IsString<"hi"> = "yes";
const b: IsString<42> = "no";

type ElementType<T> = T extends (infer E)[] ? E : T;
const e1: ElementType<string[]> = "x"; // string
const e2: ElementType<number> = 1; // number (not an array: unchanged)

type MyReturnType<F> = F extends (...args: any[]) => infer R ? R : never;
const r: MyReturnType<() => boolean> = true;

type MyExclude<T, U> = T extends U ? never : T; // how Exclude works
type Letters = MyExclude<"a" | "b" | "c", "a">; // "b" | "c"
const l: Letters = "b";

console.log(a, b, e1, e2, r, l);
