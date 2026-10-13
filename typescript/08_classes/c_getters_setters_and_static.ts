/*
 get / set   accessors: look like properties, run code
 static      belongs to the class itself, not to instances
*/

class Temperature {
  static readonly absoluteZero = -273.15;
  static #instances = 0;

  #celsius = 0;

  constructor(celsius: number) {
    this.celsius = celsius; // uses the setter
    Temperature.#instances++;
  }

  get celsius(): number {
    return this.#celsius;
  }

  set celsius(value: number) {
    if (value < Temperature.absoluteZero) throw new RangeError("below absolute zero");
    this.#celsius = value;
  }

  get fahrenheit(): number {
    return (this.#celsius * 9) / 5 + 32;
  }

  static count(): number {
    return Temperature.#instances;
  }

  static fromFahrenheit(f: number): Temperature {
    return new Temperature(((f - 32) * 5) / 9);
  }
}

const t = new Temperature(25);
console.log(t.celsius, t.fahrenheit); // 25 77
t.celsius = 100;
console.log(t.fahrenheit); // 212
console.log(Temperature.fromFahrenheit(212).celsius, Temperature.count()); // 100 2
try {
  t.celsius = -300;
} catch (e) {
  console.log((e as Error).message); // below absolute zero
}
