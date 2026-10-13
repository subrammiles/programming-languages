/*
Common patterns
Regex for validation is a quick first check, not a guarantee.
*/
const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  indianMobile: /^[6-9]\d{9}$/,
  pincode: /^\d{6}$/,
  hexColor: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
};

const tests = {
  email: ["asha@example.com", "asha@", "a b@c.com"],
  indianMobile: ["9876543210", "1234567890"],
  pincode: ["500001", "5000"],
  hexColor: ["#fff", "#1A2B3C", "#12345"],
  slug: ["my-first-post", "My Post", "post--x"]
};

for (const [name, values] of Object.entries(tests)) {
  for (const v of values) console.log(name.padEnd(13), v.padEnd(18), patterns[name].test(v));
}

console.log("<<<< split on multiple separators >>>>");
console.log("a, b;c  d".split(/[,;\s]+/));// [ 'a', 'b', 'c', 'd' ]

console.log("<<<< escaping user input for a regex >>>>");
// Characters like . * ? ( ) have special meaning and must be escaped
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const search = "1+1";
console.log(new RegExp(escapeRegex(search)).test("is 1+1 = 2?"));// true
// Node 24+ has this built in: RegExp.escape("1+1")
