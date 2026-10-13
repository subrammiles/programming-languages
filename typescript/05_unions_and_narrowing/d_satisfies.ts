/*
satisfies (TypeScript 4.9): check that a value matches a type WITHOUT widening it.
 const x: T = value          -> x has type T (loses the specific details)
 const x = value satisfies T -> checked against T, but keeps its exact inferred type
*/

type Color = "red" | "green" | "blue";
type Palette = Record<Color, string | [number, number, number]>;

const annotated: Palette = { red: [255, 0, 0], green: "#00ff00", blue: [0, 0, 255] };
// annotated.green.toUpperCase(); // error: green might be a tuple

const checked = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Palette; // still checked: a missing color or a typo is an error

console.log(checked.green.toUpperCase()); // #00FF00 -> TypeScript knows green is a string
console.log(checked.red.map((c) => c / 255)); // [ 1, 0, 0 ] -> and red is a tuple
console.log(Object.keys(annotated));
