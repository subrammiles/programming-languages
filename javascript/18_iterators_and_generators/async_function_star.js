/*
The async function* keywords can be used to 
define an async generator function inside an expression.
*/

async function* getSeqOfEvenNumbers() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  yield 2;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  yield 4;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  yield 6;
}

(async () => {
  let generator = getSeqOfEvenNumbers();
  for await (let value of generator) {
    console.log(value);
  }
})();
