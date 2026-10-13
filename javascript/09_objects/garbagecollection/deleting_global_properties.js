/*
If a global property is configurable (for example, 
via direct property assignment), it can be deleted, 
and subsequent references to them as global
variables will produce a ReferenceError.
*/

globalThis.globalVar = 1;
console.log(globalVar); // 1
// In non-strict mode, you can use `delete globalVar` as well
delete globalThis.globalVar;
console.log(globalVar); // ReferenceError: globalVar is not defined