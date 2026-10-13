/*Error objects are thrown when runtime errors occur. */

try {
  throw new Error("Whoops!");
} catch (e) {
  console.error(`${e.name}: ${e.message}`);
}
