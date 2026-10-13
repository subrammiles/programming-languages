/*
Importing modules
 import { a, b } from "./file.ts"     named imports (include the .ts extension when Node runs TS directly)
 import x from "./file.ts"            default import
 import * as lib from "./file.ts"     everything, as a namespace object
 import type { T } from "./file.ts"   TYPE-ONLY import: removed completely from the JavaScript
                                      ("verbatimModuleSyntax" in tsconfig makes this required for types)
Run: node 12_modules/main.ts
*/

import square, { circleArea, PI } from "./lib/math.ts";
import * as lib from "./lib/index.ts";
import type { Shape, Stats } from "./lib/math.ts";
import { readFileSync } from "node:fs"; // Node built-in modules use the "node:" prefix

function area(shape: Shape): number {
  return shape.kind === "circle" ? circleArea(shape.radius) : square(shape.side);
}

const summary: Stats = lib.stats([2, 4, 9]);
console.log(PI, area({ kind: "circle", radius: 1 }), area({ kind: "square", side: 3 })); // 3.14159 3.14159 9
console.log(summary); // { count: 3, mean: 5 }
console.log(lib.square(5)); // 25
console.log(readFileSync(new URL("./lib/math.ts", import.meta.url), "utf8").split("\n").length > 10); // true

// Dynamic import: load a module only when needed
const { stats } = await import("./lib/math.ts");
console.log(stats([1, 1]).mean); // 1
