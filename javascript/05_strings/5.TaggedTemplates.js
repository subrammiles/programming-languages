/*
Tagged template literals
A "tag" is a function placed in front of a template literal.
The function receives:
  1. an array of the plain string parts
  2. the values of each ${...} expression
and can return anything (not only a string).
Used by libraries like styled-components, lit-html and SQL query builders.
*/
console.log("<<<<Test1 - what the tag receives >>>>>")
function inspect(strings, ...values) {
  console.log(strings);// [ 'Name: ', ', Age: ', '' ]
  console.log(values);// [ 'Ravi', 30 ]
}
const name = "Ravi";
const age = 30;
inspect`Name: ${name}, Age: ${age}`;

console.log("<<<<Test2 - highlight values >>>>>")
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) =>
    result + str + (i < values.length ? `[${values[i]}]` : ""), "");
}
console.log(highlight`Name: ${name}, Age: ${age}`);// Name: [Ravi], Age: [30]

console.log("<<<<Test3 - escaping user input (safe HTML) >>>>>")
function safeHtml(strings, ...values) {
  const escape = (v) => String(v)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return strings.reduce((out, str, i) =>
    out + str + (i < values.length ? escape(values[i]) : ""), "");
}
const comment = "<script>alert('hacked')</script>";
console.log(safeHtml`<p>${comment}</p>`);
// <p>&lt;script&gt;alert('hacked')&lt;/script&gt;</p>

console.log("<<<<Test4 - String.raw (built-in tag) >>>>>")
console.log(`C:\new\table`);// escapes are processed (newline + tab)
console.log(String.raw`C:\new\table`);// C:\new\table
