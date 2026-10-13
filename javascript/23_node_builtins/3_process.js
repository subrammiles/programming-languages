/*
process - information about the running Node program
Try: node 3_process.js hello --verbose
     NODE_ENV=production node 3_process.js
*/
console.log("<<<< command line arguments >>>>");
console.log(process.argv);// [ '/path/to/node', '/path/to/3_process.js', 'hello', '--verbose' ]
const args = process.argv.slice(2);
console.log(args);// [ 'hello', '--verbose' ]

// Built-in argument parser (Node 18.3+)
const { parseArgs } = require("node:util");
const { values, positionals } = parseArgs({
  options: { verbose: { type: "boolean", short: "v" } },
  allowPositionals: true
});
console.log(values, positionals);// { verbose: true } [ 'hello' ]

console.log("<<<< environment variables >>>>");
console.log(process.env.NODE_ENV ?? "NODE_ENV not set");
console.log(process.env.HOME);// your home folder
// Keep secrets (API keys, passwords) in env variables, never in code.
// Node 20.6+ can load a .env file: node --env-file=.env app.js

console.log("<<<< runtime info >>>>");
console.log(process.version);// v20.x.x
console.log(process.platform);// linux / darwin / win32
console.log(process.cwd());// folder you ran node from
console.log(process.pid);
console.log(Math.round(process.memoryUsage().heapUsed / 1024 / 1024), "MB heap");
console.log(process.uptime().toFixed(3), "seconds running");

console.log("<<<< exit codes and events >>>>");
process.on("exit", (code) => console.log(`exiting with code ${code}`));
// process.exit(1);  // 0 = success, anything else = failure
process.exitCode = 0;
