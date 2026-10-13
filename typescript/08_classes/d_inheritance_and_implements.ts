/*
 implements   a class promises to match an interface (checked by TypeScript)
 extends      a class inherits from another class
 override     marks a method that replaces a parent method
              ("noImplicitOverride" in tsconfig makes the keyword required)
 super        calls the parent's constructor or methods
*/

interface Shape {
  getArea(): number;
  describe(): string;
}

class Rectangle implements Shape {
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  width: number;
  height: number;

  getArea(): number {
    return this.width * this.height;
  }

  describe(): string {
    return `${this.constructor.name} with area ${this.getArea()}`;
  }
}

class Square extends Rectangle {
  constructor(side: number) {
    super(side, side);
  }

  override describe(): string {
    return "a square: " + super.describe();
  }
}

const shapes: Shape[] = [new Rectangle(4, 5), new Square(3)];
for (const s of shapes) console.log(s.describe());
// Rectangle with area 20
// a square: Square with area 9
console.log(new Square(2) instanceof Rectangle); // true
