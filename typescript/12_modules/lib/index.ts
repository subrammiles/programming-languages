// A "barrel" file re-exports from several modules so users import from one place.
export { circleArea, PI, stats } from "./math.ts";
export type { Shape, Stats } from "./math.ts";
export { default as square } from "./math.ts";
