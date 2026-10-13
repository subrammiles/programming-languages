/*
Object.freeze(obj) -> cannot add, delete or change properties
Object.seal(obj)   -> cannot add or delete, but CAN change existing ones
Both are SHALLOW: nested objects are still changeable.
In non-strict mode, failed changes are silently ignored.
In strict mode ("use strict" / ES modules / classes) they throw a TypeError.
*/
console.log("<<<<freeze>>>>>")
const config = Object.freeze({ port: 3000, db: { host: "localhost" } });
config.port = 9999;// ignored
config.newKey = 1;// ignored
delete config.port;// ignored
console.log(config.port, config.newKey);// 3000 undefined
console.log(Object.isFrozen(config));// true

console.log("<<<<freeze is shallow>>>>>")
config.db.host = "changed!";
console.log(config.db.host);// changed!

console.log("<<<<deep freeze>>>>>")
function deepFreeze(obj) {
  for (const value of Object.values(obj)) {
    if (typeof value === "object" && value !== null) deepFreeze(value);
  }
  return Object.freeze(obj);
}
const settings = deepFreeze({ ui: { theme: "dark" } });
settings.ui.theme = "light";
console.log(settings.ui.theme);// dark

console.log("<<<<seal>>>>>")
const user = Object.seal({ name: "Asha" });
user.name = "Ravi";// allowed
user.age = 30;// ignored
delete user.name;// ignored
console.log(user);// { name: 'Ravi' }

console.log("<<<<strict mode throws>>>>>");
(function () {
  "use strict";
  try {
    config.port = 1;
  } catch (e) {
    console.log(e.constructor.name, "-", e.message);
    // TypeError - Cannot assign to read only property 'port' of object
  }
})();
