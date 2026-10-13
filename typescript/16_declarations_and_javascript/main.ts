/*
Using JavaScript and declaration files from TypeScript.
Run: node 16_declarations_and_javascript/main.ts
*/

import { totalQuantity, withTax } from "./legacy.js";
import type { LineItem } from "./legacy.js";

const items: LineItem[] = [
  { name: "pen", qty: 3 },
  { name: "book", qty: 1 },
];
console.log(withTax(100), totalQuantity(items)); // 118 4
// withTax("100"); // error TS2345: the .d.ts says price is a number

globalThis.APP_VERSION = "2.0.0";
console.log(APP_VERSION); // 2.0.0

const mode = process.env.APP_MODE ?? "development"; // typed as "development" | "production"
console.log(mode);
