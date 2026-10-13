/*
Mapped types build a new object type by looping over keys:
 { [K in keyof T]: ... }
Modifiers: readonly, ?, and -readonly / -? to remove them.
Key remapping with "as" (TS 4.1) renames or filters keys.
Partial, Required, Readonly, Record and Pick are all mapped types.
*/

type MyPartial<T> = { [K in keyof T]?: T[K] };
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };

interface User {
  readonly id: number;
  name: string;
}

const partial: MyPartial<User> = { name: "Asha" };
const editable: Mutable<User> = { id: 1, name: "Ravi" };
editable.id = 2; // allowed: readonly removed
const blank: Nullable<User> = { id: null, name: null };
const getters: Getters<User> = { getId: () => 1, getName: () => "Meena" };

console.log(partial, editable, blank, getters.getName());
