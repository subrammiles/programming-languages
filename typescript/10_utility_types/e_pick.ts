/*
Pick<T, Keys> keeps only the listed properties.
*/

interface Person {
  name: string;
  age: number;
  location?: string;
}

const bob: Pick<Person, "name"> = {
  name: "Bob",
  // age: 30, // error: Pick kept only "name"
};
console.log(bob);

type ContactCard = Pick<Person, "name" | "location">;
const card: ContactCard = { name: "Asha", location: "Hyderabad" };
console.log(card);
