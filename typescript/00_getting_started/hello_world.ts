/*
TypeScript = JavaScript + types.
Types are checked BEFORE the code runs (by the tsc compiler or your editor),
then removed: what actually runs is plain JavaScript.

Run:    node 00_getting_started/hello_world.ts    (Node 22.18+ strips the types itself)
Check:  npm run check                              (tsc reports type errors, runs nothing)
*/

const greeting: string = "Hello World";
console.log(greeting);

// "console" is an object declared in the Node/browser type definitions:
//     declare var console: Console
// "log" writes a message to the console.

function greet(name: string): string {
  return `Hello, ${name}!`;
}
console.log(greet("Subbu"));
// greet(42); // error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
