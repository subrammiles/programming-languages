/*
The code we want to test.
*/
function add(a, b) {
  return a + b;
}

function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

async function fetchDouble(n) {
  await new Promise(resolve => setTimeout(resolve, 10));
  return n * 2;
}

module.exports = { add, divide, fetchDouble };
