/*
interface describes the shape of an OBJECT.
 - extends: build on other interfaces
 - can describe methods, optional and readonly properties, index signatures
*/

interface Rectangle {
  height: number;
  width: number;
}

interface ColorRectangle extends Rectangle {
  color: string;
}

interface Shape {
  readonly name: string;
  area(): number;
  label?: string;
}

const rectangle: Rectangle = { height: 20, width: 10 };
const colorRectangle: ColorRectangle = { height: 20, width: 10, color: "red" };
const square: Shape = { name: "square", area: () => 16 };

console.log(rectangle, colorRectangle.color, square.area()); // { height: 20, width: 10 } red 16

// Structural typing: any object with the right shape fits, no "implements" needed
function describe(r: Rectangle): string {
  return `${r.width}x${r.height}`;
}
console.log(describe(colorRectangle)); // 10x20 -> a ColorRectangle is also a Rectangle
