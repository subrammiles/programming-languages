/*
A module exports values and types for other files to import.
 named exports:   export function / export const / export type
 default export:  export default ...   (one per file; named exports are usually clearer)
*/

export const PI = 3.14159;

export function circleArea(radius: number): number {
  return PI * radius * radius;
}

export type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };

export interface Stats {
  count: number;
  mean: number;
}

export function stats(values: readonly number[]): Stats {
  const sum = values.reduce((a, b) => a + b, 0);
  return { count: values.length, mean: values.length ? sum / values.length : 0 };
}

export default function square(n: number): number {
  return n * n;
}
