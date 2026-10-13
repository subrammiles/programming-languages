/*
Scripts vs modules
A .ts file WITHOUT import/export is a "script": its top-level names are GLOBAL,
shared with every other script. Declaring the same name in two scripts was an error:
  error TS2451: Cannot redeclare block-scoped variable 'myVarToTestBlockScope'.
A file WITH import/export is a "module": its names are private to the file.

This project sets "moduleDetection": "force" in tsconfig.json, so EVERY file is a module
and file2.ts can declare the same name without a clash. Modern code is always modules.
*/

let myVarToTestBlockScope = 2;
console.log("file1:", myVarToTestBlockScope);
