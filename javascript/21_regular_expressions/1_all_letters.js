

const regex = new RegExp(/^a...s$/);

console.log(regex.test('alias'));//true
console.log(regex.test('Ab')); // false