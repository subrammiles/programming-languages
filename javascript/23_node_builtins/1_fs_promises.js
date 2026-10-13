/*
fs/promises - reading and writing files with async/await
Use the "node:" prefix to make it clear it is a built-in module.
Avoid readFileSync/writeFileSync in servers: they block the event loop.
*/
const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");

async function main() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "fs-demo-"));// a temp folder
  const file = path.join(dir, "notes.txt");

  await fs.writeFile(file, "line 1\n");
  await fs.appendFile(file, "line 2\n");
  console.log(await fs.readFile(file, "utf8"));// line 1 \n line 2

  console.log("<<<< JSON files >>>>");
  const jsonFile = path.join(dir, "data.json");
  await fs.writeFile(jsonFile, JSON.stringify({ name: "Asha" }, null, 2));
  const data = JSON.parse(await fs.readFile(jsonFile, "utf8"));
  console.log(data.name);// Asha

  console.log("<<<< list a folder >>>>");
  console.log(await fs.readdir(dir));// [ 'data.json', 'notes.txt' ]

  console.log("<<<< file info >>>>");
  const stats = await fs.stat(file);
  console.log(stats.size, "bytes, is file:", stats.isFile());// 14 bytes, is file: true

  console.log("<<<< check if a file exists >>>>");
  try {
    await fs.access(path.join(dir, "missing.txt"));
  } catch (e) {
    console.log(e.code);// ENOENT (no such file)
  }

  await fs.rm(dir, { recursive: true });// clean up
  console.log("temp folder removed");
}
main();
