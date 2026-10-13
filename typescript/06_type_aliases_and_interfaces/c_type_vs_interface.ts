/*
type vs interface - both describe object shapes. Differences:
 interface: can be re-opened and extended later (declaration merging), extends reads nicely
 type:      can also name unions, tuples, primitives, mapped and conditional types
Common advice: use interface for object shapes and public APIs, type for everything else.
Either is fine; be consistent.
*/

interface Window2 {
  title: string;
}
interface Window2 {
  // declaration merging: both declarations combine
  width: number;
}
const w: Window2 = { title: "main", width: 800 };

type Status = "active" | "inactive"; // only a type alias can name a union
type Pair = [string, number]; // or a tuple

// Extending: interface uses extends, type uses &
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}
type Cat = Animal & { indoor: boolean };

const dog: Dog = { name: "Bruno", breed: "Labrador" };
const cat: Cat = { name: "Tom", indoor: true };
const status: Status = "active";
const pair: Pair = ["age", 30];

console.log(w, dog.breed, cat.indoor, status, pair);
