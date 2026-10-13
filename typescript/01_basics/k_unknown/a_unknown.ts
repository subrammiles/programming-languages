/*
unknown accepts any value, like any, but you can't USE it until you check its type.
*/

const values: unknown[] = [1, "Subbu", true, 345.677, [1, 2, 3], { k1: "v1" }, () => "hi", null, undefined];
for (const v of values) {
  console.log(typeof v, v);
}
