

function stepOne(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(value);
        resolve();
      }, 3000);
    });
  }
  
  function stepTwo(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(value);
        resolve();
      }, 2000);
    });
  }
  
  function stepThree(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(value);
        resolve();
      }, 1000);
    });
  }
  
  // Run the functions sequentially with Promises
  stepOne(1)
    .then(() => stepTwo(2))
    .then(() => stepThree(3))
    .then(() => {
      console.log("All steps completed.");
    });

    