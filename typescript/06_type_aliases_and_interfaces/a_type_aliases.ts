/*
type gives a name to ANY type: primitives, unions, objects, functions, tuples ...
 type Name = string
 type ID = string | number
 type Point = { x: number; y: number }
An alias is just a name; it does not create a new, distinct type.
*/

type MyName = string;
type MyAge = number;
type ID = string | number;
type Point = { x: number; y: number };
type Formatter = (value: number) => string;

let ageX: MyAge = 20;
let nameY: MyName = "Subbu";
let userId: ID = "u-42";
userId = 42;
const origin: Point = { x: 0, y: 0 };
const asCurrency: Formatter = (v) => `₹${v.toFixed(2)}`;

console.log(ageX, nameY, userId, origin, asCurrency(99.5)); // 20 Subbu 42 { x: 0, y: 0 } ₹99.50

// Intersection (&): combine object types
type Timestamped = { createdAt: Date };
type Post = { title: string } & Timestamped;
const post: Post = { title: "Hello", createdAt: new Date(0) };
console.log(post.title, post.createdAt.getUTCFullYear()); // Hello 1970
