/*
Record<K, V> is an object type with keys K and values V.
With a union of literal keys, EVERY key must be present.
*/

const nameAgeMap: Record<string, number> = { Alice: 21, Bob: 25 };
console.log(nameAgeMap);

type Role = "admin" | "editor" | "viewer";
const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
}; // leaving out "viewer" would be an error
console.log(permissions.editor); // [ 'read', 'write' ]
