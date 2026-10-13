/*
Omit<T, Keys> removes the listed properties (the opposite of Pick).
*/

interface Person {
  name: string;
  age: number;
  location?: string;
}

const bob: Omit<Person, "age" | "location"> = {
  name: "Bob",
  // age and location were removed and can't be set here
};
console.log(bob);

interface User {
  id: number;
  email: string;
  passwordHash: string;
}
type PublicUser = Omit<User, "passwordHash">; // safe to send to the browser
const shown: PublicUser = { id: 1, email: "asha@example.com" };
console.log(shown);
