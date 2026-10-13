/*
Parameter properties: a shortcut that declares AND assigns a field from a constructor parameter.
 constructor(private name: string) {}
is the same as
 private name: string;
 constructor(name: string) { this.name = name; }
Like enums, they generate code, so run with:
  node --experimental-transform-types 08_classes/f_parameter_properties.ts
(With "erasableSyntaxOnly" in tsconfig, TypeScript 5.8+ can forbid such features.)
*/

class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
    private label = "point",
  ) {}

  toString(): string {
    return `${this.label}(${this.x}, ${this.y})`;
  }
}

const p = new Point(3, 4);
console.log(String(p), p.x + p.y); // point(3, 4) 7
