// Pretend this module is large, so we only want to load it when needed.
console.log("  (heavy_math.mjs loaded)");// runs once, the first time it is imported

export const square = (n) => n * n;
export const cube = (n) => n ** 3;
