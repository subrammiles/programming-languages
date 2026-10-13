/*
#field in obj (ES2022)
Checks if an object has a private field, without throwing.
Accessing obj.#field on an object that lacks it throws a TypeError.
Useful for a "brand check": is this object really an instance of my class?
*/
class Money {
  #amount;
  constructor(amount) { this.#amount = amount; }

  static isMoney(obj) {
    return #amount in obj;
  }

  add(other) {
    if (!Money.isMoney(other)) throw new TypeError("Can only add Money");
    return new Money(this.#amount + other.#amount);
  }

  get value() { return this.#amount; }
}

const a = new Money(100);
const b = new Money(50);
console.log(a.add(b).value);// 150

const fake = { amount: 50 };
console.log(Money.isMoney(a));// true
console.log(Money.isMoney(fake));// false
try {
  a.add(fake);
} catch (e) {
  console.log(e.message);// Can only add Money
}
