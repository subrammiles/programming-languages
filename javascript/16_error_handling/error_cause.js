/*
Error cause (ES2022)
new Error(message, { cause })
Wrap a low-level error in a more meaningful one WITHOUT losing the original.
*/
function readConfig() {
  try {
    JSON.parse("{ bad json");
  } catch (err) {
    throw new Error("Could not load config file", { cause: err });
  }
}

try {
  readConfig();
} catch (err) {
  console.log(err.message);// Could not load config file
  console.log(err.cause.name);// SyntaxError
  console.log(err.cause.message);// Expected property name or '}' in JSON at position 2 ...
}
