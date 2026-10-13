/*
Optional properties are marked with ?
Their type includes undefined, so you must check before using them.
*/

const car1: { carType: string; year: number } = { carType: "Swift", year: 2009 };
// const car2: { carType: string; year: number } = { carType: "Swift" }; // error: 'year' is missing

const car3: { carType: string; year?: number } = { carType: "Swift" }; // ok: year is optional

function describe(car: { carType: string; year?: number }): string {
  // car.year.toString(); // error TS18048: 'car.year' is possibly 'undefined'.
  return car.year === undefined ? `${car.carType} (year unknown)` : `${car.carType} from ${car.year}`;
}

console.log(describe(car1)); // Swift from 2009
console.log(describe(car3)); // Swift (year unknown)
console.log(car3.year ?? "n/a"); // n/a
