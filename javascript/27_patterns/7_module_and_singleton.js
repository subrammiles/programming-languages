/*
Design patterns: Module and Singleton

Module pattern: hide private state, expose a public API.
  Before ES modules existed, this was done with an IIFE + closure.
  Today a file IS a module: anything not exported is private.

Singleton: only ONE instance of something exists (config, logger, DB connection pool).
  In JS the easiest singleton is just an object exported from a module:
  modules are cached, so every importer gets the same object.
*/

console.log("<<<< module pattern (IIFE + closure) >>>>");
const bankAccount = (function () {
  let balance = 0;// private: not reachable from outside
  function log(msg) {// private helper
    console.log(`  [account] ${msg}`);
  }
  return {// the public API (the "revealing module pattern")
    deposit(amount) {
      balance += amount;
      log(`deposited ${amount}`);
    },
    getBalance: () => balance,
  };
})();
bankAccount.deposit(50);//   [account] deposited 50
console.log(bankAccount.getBalance(), bankAccount.balance);// 50 undefined

console.log("<<<< singleton with a class >>>>");
class Config {
  static #instance;
  #settings = {};

  constructor() {
    if (Config.#instance) return Config.#instance;// return the existing one
    Config.#instance = this;
  }
  static getInstance() {
    return (Config.#instance ??= new Config());
  }
  set(key, value) {
    this.#settings[key] = value;
  }
  get(key) {
    return this.#settings[key];
  }
}
const a = Config.getInstance();
const b = new Config();
a.set("theme", "dark");
console.log(a === b, b.get("theme"));// true dark

console.log("<<<< singleton the simple way: a frozen object (in its own module) >>>>");
const logger = Object.freeze({
  entries: [],
  log(msg) {
    this.entries.push(`${new Date(0).toISOString().slice(0, 10)} ${msg}`);
  },
});
logger.log("started");
logger.log("ready");
console.log(logger.entries);// [ '1970-01-01 started', '1970-01-01 ready' ]
// module.exports = logger;  -> every require() gets this same object

// Downside of singletons: hidden global state makes testing harder.
// Often it is better to create one instance at startup and pass it to whoever needs it.
