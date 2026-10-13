/*
Object types describe the shape of an object: property names and their types.
 { carType: string; year: number }
Usually you give the shape a name with type or interface (chapter 06).
*/

const myCar: { carType: string; year: number } = {
  carType: "Swift",
  year: 2009,
};

let myCar2: { carType: string; year: number };
myCar2 = { carType: "Swift", year: 2009 };
// myCar2 = { carType: "Swift" }; // error TS2741: Property 'year' is missing
// myCar2.colour = "red";          // error TS2339: Property 'colour' does not exist

console.log(myCar, myCar2.year);
