/*
What's new: the newest features (ES2026 and finished proposals)
These already run on Node 24. Check https://node.green or MDN for browser support.

  using / await using     -> automatic clean-up when a block ends (explicit resource management)
  DisposableStack         -> collect several clean-ups and run them together
  Error.isError           -> reliable "is this an Error?" check (works across realms)
  Array.fromAsync         -> build an array from an async iterable

Coming next, not in Node 24 yet: Temporal (see 28_misc/date/temporal.js),
Math.sumPrecise, Uint8Array.prototype.toBase64 / fromBase64, Map.prototype.getOrInsert.
*/

console.log("<<<< using: clean-up runs when the block ends, even on errors >>>>");
function openFile(name) {
  console.log(`  open ${name}`);
  return {
    name,
    read: () => `contents of ${name}`,
    [Symbol.dispose]() {// called automatically by `using`
      console.log(`  close ${name}`);
    },
  };
}
{
  using a = openFile("a.txt");
  using b = openFile("b.txt");
  console.log(" ", a.read());
}// disposed in REVERSE order: b first, then a
//   open a.txt
//   open b.txt
//   contents of a.txt
//   close b.txt
//   close a.txt

try {
  using f = openFile("c.txt");
  throw new Error("boom");
} catch (e) {
  console.log("  caught", e.message, "(the file was already closed)");
}
//   open c.txt
//   close c.txt
//   caught boom (the file was already closed)

console.log("<<<< DisposableStack >>>>");
{
  using stack = new DisposableStack();
  stack.defer(() => console.log("  release lock"));
  stack.defer(() => console.log("  delete temp dir"));
  stack.use(openFile("log.txt"));
  console.log("  working...");
}
//   open log.txt
//   working...
//   close log.txt
//   delete temp dir
//   release lock

console.log("<<<< Error.isError >>>>");
const fake = Object.create(Error.prototype);// looks like an Error to instanceof
console.log(fake instanceof Error, Error.isError(fake));// true false
console.log(Error.isError(new TypeError("x")), Error.isError({ message: "x" }));// true false

async function main() {
  console.log("<<<< await using: async clean-up >>>>");
  {
    await using db = {
      query: (sql) => `result of ${sql}`,
      async [Symbol.asyncDispose]() {
        await new Promise((r) => setTimeout(r, 10));
        console.log("  db connection closed");
      },
    };
    console.log(" ", db.query("SELECT 1"));
  }
  //   result of SELECT 1
  //   db connection closed

  console.log("<<<< Array.fromAsync >>>>");
  async function* pages() {
    for (let page = 1; page <= 3; page++) {
      await new Promise((r) => setTimeout(r, 5));// pretend to fetch a page
      yield `page ${page}`;
    }
  }
  console.log(await Array.fromAsync(pages()));// [ 'page 1', 'page 2', 'page 3' ]
  console.log(await Array.fromAsync([Promise.resolve(1), 2], (x) => x * 10));// [ 10, 20 ]
}

main();
