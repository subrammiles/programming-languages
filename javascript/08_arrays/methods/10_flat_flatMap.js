/*
flat(depth)  -> flattens nested arrays (default depth = 1)
flatMap(fn)  -> map() then flat(1), in one step
*/
console.log("<<<<flat>>>>>")
const nested = [1, [2, 3], [4, [5, [6]]]];
console.log(nested.flat());// [ 1, 2, 3, 4, [ 5, [ 6 ] ] ]
console.log(nested.flat(2));// [ 1, 2, 3, 4, 5, [ 6 ] ]
console.log(nested.flat(Infinity));// [ 1, 2, 3, 4, 5, 6 ]

console.log("<<<<flatMap>>>>>")
const sentences = ["hello world", "good morning"];
console.log(sentences.map(s => s.split(" ")));// [ [ 'hello', 'world' ], [ 'good', 'morning' ] ]
console.log(sentences.flatMap(s => s.split(" ")));// [ 'hello', 'world', 'good', 'morning' ]

// flatMap can also remove items: return [] to drop, [x] to keep
const nums = [1, 2, 3, 4];
console.log(nums.flatMap(n => n % 2 === 0 ? [n * 10] : []));// [ 20, 40 ]
