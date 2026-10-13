/*
Partial<T> makes every property optional. Common for "update" functions.
*/

interface Point {
  x: number;
  y: number;
}

let pointPart: Partial<Point> = {}; // x and y are both optional now
pointPart.x = 10;
console.log(pointPart); // { x: 10 }

function update(point: Point, changes: Partial<Point>): Point {
  return { ...point, ...changes };
}
console.log(update({ x: 1, y: 2 }, { y: 5 })); // { x: 1, y: 5 }
