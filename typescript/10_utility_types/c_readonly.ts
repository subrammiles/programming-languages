/*
Readonly<T> makes every property readonly (shallow: nested objects can still change).
*/

interface Settings {
  theme: string;
  fontSize: number;
}

const settings: Readonly<Settings> = { theme: "dark", fontSize: 14 };
// settings.theme = "light"; // error TS2540: Cannot assign to 'theme' because it is a read-only property.
console.log(settings);

const frozen = Object.freeze({ theme: "dark" }); // Object.freeze returns a Readonly type too
console.log(frozen.theme);
