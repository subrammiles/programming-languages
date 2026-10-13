async function journey(name) {
  console.log(name, "start");
  console.log(name, "travels");
  console.log(name, "end");
}

foo("Bike");
foo("Car");

// Bike start
// Bike travels
// Bike end
// Car start
// Car travels
// Car end

/*

In this case, the two async functions are synchronous in effect, because they don't contain any await expression. 
The three statements happen in the same tick
*/

function journeyEquivalent(name) {
  return new Promise((resolve) => {
    console.log(name, "start");
    console.log(name, "travels");
    console.log(name, "end");
    resolve();
  });
}
