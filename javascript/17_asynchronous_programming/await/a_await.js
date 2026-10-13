async function addTwoNumbers(a, b) {
  return a + b;
}

/* sum1 is without using the await operation*/
async function sum1() {
  const result = addTwoNumbers(1, 2);
  console.log(result);
  //Expected output :3
  // Actual output:A promise
}

/* sum2 is with  the await operation*/
async function sum2() {
  /*await works inside async function only*/
  const result = await addTwoNumbers(1, 2);
  /*The await operator waits for the  Promise addTwoNumbers and gets 
its fulfillment value.1+2=3 */
  console.log(result);
}

sum1();
sum2();
