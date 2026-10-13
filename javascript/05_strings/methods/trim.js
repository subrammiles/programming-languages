/*
trim() removes whitespace (spaces, tabs, newlines) from both ends.
trimStart() / trimEnd() remove it from one side only.
The original string is not changed.
*/
const input = "   hello world  \n";

console.log(`[${input.trim()}]`);// [hello world]
console.log(`[${input.trimStart()}]`);// [hello world  \n] (newline still there)
console.log(`[${input.trimEnd()}]`);// [   hello world]
