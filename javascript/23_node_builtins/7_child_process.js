/*
Running other programs with node:child_process
  execFile(file, args)  -> run a program, collect all output when it finishes
  spawn(cmd, args)      -> run a program and STREAM its output (long-running, big output)
  exec("cmd string")    -> run through a shell (pipes, globs). Never put user input
                           in the string: that allows shell injection. Prefer execFile.
  fork("script.js")     -> start another Node process with a message channel
Each has a *Sync version that blocks the event loop (fine for scripts, bad for servers).
*/
const { execFile, execFileSync, spawn } = require("node:child_process");
const { promisify } = require("node:util");
const execFileAsync = promisify(execFile);

async function main() {
  console.log("<<<< execFileSync: simplest, blocks until done >>>>");
  const version = execFileSync(process.execPath, ["--version"], { encoding: "utf8" });
  console.log(version.startsWith("v"));// true

  console.log("<<<< execFile with promises >>>>");
  const { stdout } = await execFileAsync(process.execPath, ["-e", "console.log(6 * 7)"]);
  console.log(stdout.trim());// 42

  console.log("<<<< errors: non-zero exit code >>>>");
  try {
    await execFileAsync(process.execPath, ["-e", "process.exit(3)"]);
  } catch (err) {
    console.log("exit code:", err.code);// exit code: 3
  }

  console.log("<<<< spawn: stream output as it arrives >>>>");
  const script = "for (let i = 1; i <= 3; i++) setTimeout(() => console.log('tick ' + i), i * 20)";
  const child = spawn(process.execPath, ["-e", script]);
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (chunk) => process.stdout.write("  child says: " + chunk));
  const code = await new Promise((resolve) => child.on("close", resolve));
  console.log("child exited with", code);
  //   child says: tick 1
  //   child says: tick 2
  //   child says: tick 3
  // child exited with 0
}

main();
