/*
Required<T> makes every property required (the opposite of Partial).
*/

interface Car {
  make: string;
  model: string;
  mileage?: number;
}

let myCar: Required<Car> = {
  make: "Ford",
  model: "Focus",
  mileage: 12000, // Required forces mileage to be present
};
console.log(myCar);
// const noMileage: Required<Car> = { make: "Ford", model: "Focus" }; // error TS2741
