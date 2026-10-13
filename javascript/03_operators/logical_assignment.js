/*
Logical assignment operators (ES2021)
  a ||= b   ->  a || (a = b)    assign if a is falsy
  a &&= b   ->  a && (a = b)    assign if a is truthy
  a ??= b   ->  a ?? (a = b)    assign if a is null or undefined
*/
console.log("<<<<Test1 - ||= >>>>>")
let title = "";
title ||= "Untitled";
console.log(title);// Untitled ("" is falsy)

console.log("<<<<Test2 - &&= >>>>>")
let loggedInUser = { name: "Asha" };
loggedInUser &&= loggedInUser.name.toUpperCase();
console.log(loggedInUser);// ASHA

let noUser = null;
noUser &&= "never assigned";
console.log(noUser);// null

console.log("<<<<Test3 - ??= vs ||= >>>>>")
const settings = { volume: 0, theme: null };
settings.volume ||= 50;// 0 is falsy -> overwritten!
settings.theme ??= "dark";
console.log(settings);// { volume: 50, theme: 'dark' }

const settings2 = { volume: 0 };
settings2.volume ??= 50;// 0 is not null/undefined -> kept
console.log(settings2);// { volume: 0 }
