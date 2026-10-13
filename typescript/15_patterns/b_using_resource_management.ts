/*
Explicit resource management: "using" (TypeScript 5.2, now in JavaScript itself; Node 24 runs it).
A value with a [Symbol.dispose]() method is cleaned up automatically when its block ends,
like try/finally, Python's "with", or C#'s "using".
 using x = ...         sync clean-up
 await using x = ...   async clean-up ([Symbol.asyncDispose])
*/

function openFile(name: string) {
  console.log(`open ${name}`);
  return {
    read: () => `contents of ${name}`,
    [Symbol.dispose]() {
      console.log(`close ${name}`);
    },
  };
}

function readBoth(): string {
  using a = openFile("a.txt");
  using b = openFile("b.txt");
  return a.read() + " + " + b.read();
} // b closes first, then a (reverse order), even if an error is thrown

console.log(readBoth());

async function connect() {
  console.log("connect");
  return {
    query: async (sql: string) => `rows for ${sql}`,
    async [Symbol.asyncDispose]() {
      console.log("disconnect");
    },
  };
}

{
  await using db = await connect();
  console.log(await db.query("SELECT 1"));
}
