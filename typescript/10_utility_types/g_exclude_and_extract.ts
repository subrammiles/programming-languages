/*
For UNION types:
 Exclude<Union, U>  removes members assignable to U
 Extract<Union, U>  keeps only members assignable to U
 NonNullable<T>     removes null and undefined
*/

type Primitive = string | number | boolean;
const value: Exclude<Primitive, string> = true; // number | boolean: a string is not allowed
console.log(value);

type Event = "click" | "keydown" | "keyup" | "scroll";
type KeyEvent = Extract<Event, `key${string}`>; // "keydown" | "keyup"
const k: KeyEvent = "keyup";
console.log(k);

type MaybeName = string | null | undefined;
const definitely: NonNullable<MaybeName> = "Asha";
console.log(definitely);
