/*
matchAll(regex) (ES2020)
Returns an iterator of ALL matches, including capture groups.
The regex must have the g flag.
*/
const text = "Order #123 shipped, order #456 pending";

// match with g gives only the matched text, no groups
console.log(text.match(/#(\d+)/g));// [ '#123', '#456' ]

// matchAll gives each full match object
for (const m of text.matchAll(/#(\d+)/g)) {
  console.log(m[0], m[1], "at index", m.index);
}
// #123 123 at index 6
// #456 456 at index 26

// Collect just the numbers
const ids = [...text.matchAll(/#(\d+)/g)].map(m => Number(m[1]));
console.log(ids);// [ 123, 456 ]
