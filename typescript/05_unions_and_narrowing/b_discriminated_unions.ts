/*
Discriminated unions: each member has a common literal property (the "tag"),
so a switch on the tag narrows to the exact member.
The "never" check makes the compiler tell you when you forget a case.
This is the most useful pattern for modelling states and messages.
*/

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // shape: the circle member
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default: {
      const unreachable: never = shape; // add a new Shape and this line becomes an error
      return unreachable;
    }
  }
}

const shapes: Shape[] = [
  { kind: "circle", radius: 1 },
  { kind: "square", side: 2 },
  { kind: "rectangle", width: 2, height: 3 },
];
console.log(shapes.map((s) => area(s).toFixed(2))); // [ '3.14', '4.00', '6.00' ]

type RequestState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function render(state: RequestState): string {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return `Loaded ${state.data.length} items`; // data only exists here
    case "error":
      return `Error: ${state.message}`;
  }
}
console.log(render({ status: "loading" }));
console.log(render({ status: "success", data: ["a", "b"] }));
console.log(render({ status: "error", message: "timeout" }));
