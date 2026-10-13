/*
const type parameters (TypeScript 5.0): infer the most specific (literal, readonly) type,
as if the caller had written "as const".
NoInfer<T> (TypeScript 5.4): stop one argument from influencing what T is inferred as.
*/

function routes<const T extends readonly string[]>(paths: T): T {
  return paths;
}
const r = routes(["/home", "/about"]); // readonly ["/home", "/about"], not string[]
console.log(r);

function createFSM<S extends string>(states: S[], initial: NoInfer<S>): { state: S } {
  return { state: initial };
}
const machine = createFSM(["idle", "running"], "idle");
// createFSM(["idle", "running"], "paused"); // error: "paused" is not one of the states
console.log(machine.state); // idle
