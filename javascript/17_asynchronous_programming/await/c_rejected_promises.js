/*
If the Promise is rejected, the rejected value is thrown.
*/
async function test1() {
  try {
    const z = await Promise.reject("Something went wrong");
  } catch (e) {
    console.error(e); // 30
  }
}

async function test2() {
  const promisedFunction = () => {
    // Immediately return a promise to minimize chance of an error being thrown
    return new Promise((resolve, reject) => {
        reject("Something went wrong again");
    });
  };

  const response = await promisedFunction().catch((err) => {
    console.error(err);
    return "default response";
  });

  console.log(response);
}

test1();
test2();
