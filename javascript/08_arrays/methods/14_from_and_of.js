/*
Array.from(iterableOrArrayLike, mapFn) -> builds an array from anything iterable
Array.of(...items)                      -> builds an array from its arguments
*/
console.log(Array.from("hello"));// [ 'h', 'e', 'l', 'l', 'o' ]
console.log(Array.from(new Set([1, 1, 2])));// [ 1, 2 ]
console.log(Array.from({ length: 5 }, (_, i) => i * 2));// [ 0, 2, 4, 6, 8 ]

// Array(3) creates 3 empty slots, Array.of(3) creates [3]
console.log(Array(3));// [ <3 empty items> ]
console.log(Array.of(3));// [ 3 ]
