/*
TypeScript infers object property types from the initial values.
const stops the VARIABLE being reassigned, but properties can still change.
*/

const car = { carType: "swift", year: 2009 };
car.carType = "Ford"; // works: still a string
// car.carType = 3;   // error TS2322: Type 'number' is not assignable to type 'string'.
console.log(car);

const frozen = { carType: "swift" } as const; // properties become readonly
// frozen.carType = "Ford"; // error TS2540
console.log(frozen);
