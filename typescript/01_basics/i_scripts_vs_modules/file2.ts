/*
The same name as in file1.ts. Before "moduleDetection": "force" (or without any
import/export), this line caused:
  error TS2451: Cannot redeclare block-scoped variable 'myVarToTestBlockScope'.
Another way to make a file a module is to add:  export {};
*/

let myVarToTestBlockScope = "a different variable";
console.log("file2:", myVarToTestBlockScope);
