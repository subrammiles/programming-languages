/*
Capture groups
  ( )          -> numbered group, read with m[1], m[2] ...
  (?<name> )   -> named group, read with m.groups.name   (ES2018)
  (?: )        -> group without capturing
  \1, \k<name> -> backreference to an earlier group
*/
const date = "2026-10-13";

console.log("<<<< numbered groups >>>>");
const m1 = date.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(m1[1], m1[2], m1[3]);// 2026 10 13

console.log("<<<< named groups >>>>");
const m2 = date.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
console.log(m2.groups);// [Object: null prototype] { year: '2026', month: '10', day: '13' }
const { year, month, day } = m2.groups;
console.log(`${day}/${month}/${year}`);// 13/10/2026

console.log("<<<< named groups in replace >>>>");
console.log(date.replace(/(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/, "$<d>.$<m>.$<y>"));// 13.10.2026

console.log("<<<< non-capturing group >>>>");
console.log("hahaha".match(/(?:ha)+/)[0]);// hahaha

console.log("<<<< backreference: find repeated words >>>>");
console.log("this is is a test test".match(/\b(\w+) \1\b/g));// [ 'is is', 'test test' ]
