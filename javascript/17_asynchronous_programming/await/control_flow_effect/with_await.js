async function journey(name) {
  console.log(name, "start");
  await console.log(name, "travels");
  console.log(name, "end");
}

foo("Bike");
foo("Car");

// Bike start
// Bike travels
// Car start
// Car travels
// Bike end
// Car end

/*
  as soon as there's one await, the function becomes asynchronous, and execution of 
  following statements is deferred to the next tick.
  */

function journeyEquivalent(name) {
  return new Promise((resolve) => {
    console.log(name, "start");
    resolve(console.log(name, "travels"));
  }).then(() => {
    console.log(name, "end");
  });
}
