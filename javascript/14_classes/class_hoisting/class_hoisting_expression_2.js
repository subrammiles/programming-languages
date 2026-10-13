var Polygon = class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }};
var Square = new Polygon();
Square.height = 10;
Square.width = 10;
console.log(Square); // Output: TypeError: Polygon is not a constructor

