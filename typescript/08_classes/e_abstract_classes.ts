/*
Uses parameter properties (see f_parameter_properties.ts), so run with:
  node --experimental-transform-types 08_classes/e_abstract_classes.ts

An abstract class is a base class you can't instantiate.
 - abstract methods have no body; subclasses MUST implement them
 - normal methods are shared code, which an interface can't provide
*/

abstract class Polygon {
  abstract getArea(): number;

  describe(): string {
    return `${this.constructor.name}: area ${this.getArea().toFixed(2)}`;
  }
}

class Rectangle extends Polygon {
  constructor(private width: number, private height: number) {
    super();
  }
  getArea(): number {
    return this.width * this.height;
  }
}

class Triangle extends Polygon {
  constructor(private base: number, private height: number) {
    super();
  }
  getArea(): number {
    return (this.base * this.height) / 2;
  }
}

// new Polygon(); // error TS2511: Cannot create an instance of an abstract class.
for (const p of [new Rectangle(3, 4), new Triangle(3, 4)]) console.log(p.describe());
// Rectangle: area 12.00
// Triangle: area 6.00
