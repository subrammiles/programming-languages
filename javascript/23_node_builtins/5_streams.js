/*
Streams - handle data piece by piece instead of loading it all into memory
  Readable  -> source  (fs.createReadStream, http request)
  Writable  -> destination (fs.createWriteStream, http response)
  Transform -> changes data passing through (zlib.createGzip)
pipeline() connects them and handles errors and cleanup.
*/
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { pipeline } = require("node:stream/promises");
const { Readable, Transform } = require("node:stream");
const zlib = require("node:zlib");
const readline = require("node:readline");

async function main() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "stream-demo-"));
  const input = path.join(dir, "big.txt");

  console.log("<<<< write a large file with a stream >>>>");
  const lines = Readable.from((function* () {
    for (let i = 1; i <= 100_000; i++) yield `line ${i}\n`;
  })());
  await pipeline(lines, fs.createWriteStream(input));
  console.log("size:", fs.statSync(input).size, "bytes");

  console.log("<<<< gzip it: read -> compress -> write >>>>");
  await pipeline(
    fs.createReadStream(input),
    zlib.createGzip(),
    fs.createWriteStream(input + ".gz")
  );
  console.log("gzipped size:", fs.statSync(input + ".gz").size, "bytes");

  console.log("<<<< a custom Transform: uppercase >>>>");
  const upper = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().toUpperCase());
    }
  });
  let output = "";
  for await (const chunk of Readable.from(["hello ", "streams"]).pipe(upper)) {
    output += chunk;
  }
  console.log(output);// HELLO STREAMS

  console.log("<<<< read a file line by line >>>>");
  const rl = readline.createInterface({ input: fs.createReadStream(input) });
  let count = 0;
  for await (const line of rl) {
    if (++count <= 2) console.log(line);
  }
  console.log("total lines:", count);// 100000

  fs.rmSync(dir, { recursive: true });
}
main();
