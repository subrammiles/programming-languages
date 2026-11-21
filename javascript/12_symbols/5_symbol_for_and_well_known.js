/*
Symbol.for and well-known symbols

Symbol("x")      -> always a NEW, unique symbol
Symbol.for("x")  -> looks up a GLOBAL registry: the same key always gives the same symbol,
                    even across files, modules or iframes

Well-known symbols are built-in symbols that let your objects hook into the language:
  Symbol.iterator     -> makes an object work with for...of and spread
  Symbol.asyncIterator-> makes it work with for await...of
  Symbol.toPrimitive  -> controls conversion to number / string
  Symbol.toStringTag  -> controls Object.prototype.toString output
  Symbol.hasInstance  -> controls instanceof
  Symbol.dispose      -> used by `using` declarations (see 30_whats_new)
*/

console.log("<<<< Symbol() vs Symbol.for() >>>>");
console.log(Symbol("app") === Symbol("app"));// false
console.log(Symbol.for("app") === Symbol.for("app"));// true
console.log(Symbol.keyFor(Symbol.for("app")), Symbol.keyFor(Symbol("app")));// app undefined
console.log(Symbol("app").description);// app

console.log("<<<< Symbol.iterator >>>>");
const range = {
  from: 1,
  to: 4,
  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) yield i;
  },
};
console.log([...range]);// [ 1, 2, 3, 4 ]

console.log("<<<< Symbol.toPrimitive >>>>");
const money = {
  amount: 42,
  currency: "EUR",
  [Symbol.toPrimitive](hint) {// hint is "number", "string" or "default"
    if (hint === "number") return this.amount;
    return `${this.amount} ${this.currency}`;
  },
};
console.log(+money, `${money}`, money + "");// 42 42 EUR 42 EUR
console.log(money * 2);// 84

console.log("<<<< Symbol.toStringTag >>>>");
class Matrix {
  get [Symbol.toStringTag]() {
    return "Matrix";
  }
}
console.log(Object.prototype.toString.call(new Matrix()));// [object Matrix]
console.log(Object.prototype.toString.call([]), Object.prototype.toString.call(null));// [object Array] [object Null]

console.log("<<<< Symbol.hasInstance >>>>");
class Even {
  static [Symbol.hasInstance](n) {
    return Number.isInteger(n) && n % 2 === 0;
  }
}
console.log(4 instanceof Even, 5 instanceof Even);// true false

console.log("<<<< symbols are skipped by keys, JSON and for...in >>>>");
const secret = Symbol("secret");
const obj = { visible: 1, [secret]: 2 };
console.log(Object.keys(obj), JSON.stringify(obj), obj[secret]);// [ 'visible' ] {"visible":1} 2
