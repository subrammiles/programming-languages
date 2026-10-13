/*
Set methods (ES2025)
Requires Node 22+.
  a.union(b)               -> everything in a or b
  a.intersection(b)        -> only what is in both
  a.difference(b)          -> in a but not in b
  a.symmetricDifference(b) -> in one but not both
  a.isSubsetOf(b), a.isSupersetOf(b), a.isDisjointFrom(b)
*/
const frontend = new Set(["JS", "HTML", "CSS", "TypeScript"]);
const backend = new Set(["JS", "Python", "TypeScript", "SQL"]);

console.log(frontend.union(backend));
// Set(6) { 'JS', 'HTML', 'CSS', 'TypeScript', 'Python', 'SQL' }
console.log(frontend.intersection(backend));// Set(2) { 'JS', 'TypeScript' }
console.log(frontend.difference(backend));// Set(2) { 'HTML', 'CSS' }
console.log(frontend.symmetricDifference(backend));// Set(4) { 'HTML', 'CSS', 'Python', 'SQL' }

const basics = new Set(["HTML", "CSS"]);
console.log(basics.isSubsetOf(frontend));// true
console.log(frontend.isSupersetOf(basics));// true
console.log(basics.isDisjointFrom(backend));// true (nothing in common)

// Before ES2025:
const intersectionOld = new Set([...frontend].filter(x => backend.has(x)));
console.log(intersectionOld);// Set(2) { 'JS', 'TypeScript' }
