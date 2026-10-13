/*
path - build and take apart file paths safely
Never glue paths with "+" or "/"; Windows uses "\".
*/
const path = require("node:path");

console.log(__dirname);// folder of this file
console.log(__filename);// full path of this file

console.log(path.join("src", "utils", "..", "index.js"));// src/index.js
console.log(path.resolve("data.json"));// absolute path from the current working directory

const file = "/home/asha/projects/app/server.test.js";
console.log(path.basename(file));// server.test.js
console.log(path.basename(file, ".js"));// server.test
console.log(path.extname(file));// .js
console.log(path.dirname(file));// /home/asha/projects/app
console.log(path.parse(file));
// { root: '/', dir: '/home/asha/projects/app', base: 'server.test.js', ext: '.js', name: 'server.test' }

console.log(path.relative("/home/asha/projects", file));// app/server.test.js
console.log(path.sep);// / on Linux/Mac, \ on Windows

// In ES modules there is no __dirname. Use:
//   import.meta.dirname   (Node 20.11+)
//   import.meta.filename
