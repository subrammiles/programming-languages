function stepOne(value, callback) {
    setTimeout(() => {
      console.log(value);
      callback();
    }, 3000);
  }
  
  function stepTwo(value, callback) {
    setTimeout(() => {
      console.log(value);
      callback();
    }, 2000);
  }
  
  function stepThree(value, callback) {
    setTimeout(() => {
      console.log(value);
      callback();
    }, 1000);
  }
  
  // Run the functions sequentially with callbacks
  //"callback hell"
  stepOne(1, () => {
    stepTwo(2, () => {
      stepThree(3, () => {
        console.log("All steps completed.");
      });
    });
  });