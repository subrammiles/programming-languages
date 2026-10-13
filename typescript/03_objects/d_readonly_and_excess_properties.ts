/*
 readonly properties can be set once, when the object is created.
 Excess property checks: an object LITERAL with unknown extra properties is an error,
 which catches typos like "colour" vs "color".
*/

type Point = { readonly x: number; readonly y: number };
const p: Point = { x: 1, y: 2 };
// p.x = 5; // error TS2540: Cannot assign to 'x' because it is a read-only property.
console.log(p);

type Options = { color?: string; width?: number };
function draw(options: Options): void {
  console.log("drawing with", options);
}
draw({ color: "red" });
// draw({ colour: "red" }); // error TS2561: Object literal may only specify known properties. Did you mean 'color'?

const fromElsewhere = { color: "blue", extra: true };
draw(fromElsewhere); // allowed: not a fresh literal, and it has the needed shape (structural typing)
