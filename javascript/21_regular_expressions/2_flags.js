/*
Regex flags
  g  global       -> find all matches, not just the first
  i  ignore case
  m  multiline    -> ^ and $ match at each line, not only the whole string
  s  dotAll       -> . also matches newline
  u  unicode      -> handle emoji and other characters correctly
  v  unicodeSets  -> u plus set operations in [...] (ES2024, Node 20+)
  d  indices      -> give start/end positions of each group
  y  sticky       -> match only at lastIndex
*/
const text = "Cat cat CAT";

console.log("<<<< g and i >>>>");
console.log(text.match(/cat/));// [ 'cat', index: 4, ... ] first only
console.log(text.match(/cat/g));// [ 'cat' ]
console.log(text.match(/cat/gi));// [ 'Cat', 'cat', 'CAT' ]

console.log("<<<< m >>>>");
const lines = "apple\nbanana\navocado";
console.log(lines.match(/^a\w+/g));// [ 'apple' ]
console.log(lines.match(/^a\w+/gm));// [ 'apple', 'avocado' ]

console.log("<<<< s >>>>");
console.log(/hello.world/.test("hello\nworld"));// false
console.log(/hello.world/s.test("hello\nworld"));// true

console.log("<<<< u >>>>");
console.log("😀".length);// 2 (emoji is 2 UTF-16 code units)
console.log(/^.$/.test("😀"));// false
console.log(/^.$/u.test("😀"));// true
console.log(/\p{Emoji_Presentation}/u.test("hi 👋"));// true (unicode property)

console.log("<<<< v >>>>");
// [A--B] means "in A but not in B"
const consonant = /[[a-z]--[aeiou]]/v;
console.log(consonant.test("b"), consonant.test("e"));// true false

console.log("<<<< d >>>>");
const m = /(?<year>\d{4})/d.exec("Born in 1995");
console.log(m.indices.groups.year);// [ 8, 12 ]
