/*
A declaration file (.d.ts) contains ONLY types: it describes JavaScript that exists elsewhere.
 - npm packages ship them (or you install @types/package-name)
 - you can write one for a JS file or library that has no types
TypeScript uses this file when you import "./legacy.js".
*/

export declare function withTax(price: number, taxRate?: number): number;

export interface LineItem {
  name: string;
  qty: number;
}

export declare function totalQuantity(items: LineItem[]): number;
