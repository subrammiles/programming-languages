/*
Decorators (TypeScript 5.0, the standard TC39 version): functions that wrap or annotate
classes, methods, fields and accessors.  @logged  method() { ... }
Used heavily by frameworks: Angular, NestJS, TypeORM, Lit.

Node can't run decorators yet (JavaScript engines are still adding them), so
TypeScript type-checks this file but Node can't execute it directly. Run it with tsx,
which converts decorators to plain JavaScript:
  npx tsx 14_decorators/decorators.ts
(Older code uses "experimentalDecorators", a different, legacy design.)
*/

function logged<This, Args extends unknown[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) {
  const name = String(context.name);
  return function (this: This, ...args: Args): Return {
    console.log(`→ ${name}(${args.join(", ")})`);
    const result = target.call(this, ...args);
    console.log(`← ${name} returned ${String(result)}`);
    return result;
  };
}

function retry(times: number) {
  return function <This, Args extends unknown[], Return>(
    target: (this: This, ...args: Args) => Return,
    _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    return function (this: This, ...args: Args): Return {
      for (let attempt = 1; ; attempt++) {
        try {
          return target.call(this, ...args);
        } catch (e) {
          if (attempt >= times) throw e;
          console.log(`  attempt ${attempt} failed, retrying`);
        }
      }
    };
  };
}

function sealed(target: Function, context: ClassDecoratorContext): void {
  // addInitializer runs once the class is fully defined (sealing it any earlier breaks decorators)
  context.addInitializer(() => {
    Object.seal(target);
    Object.seal(target.prototype);
  });
}

@sealed
class Calculator {
  #calls = 0;

  @logged
  add(a: number, b: number): number {
    this.#calls++;
    return a + b;
  }

  @retry(3)
  flaky(): string {
    this.#calls++;
    if (this.#calls < 3) throw new Error("try again");
    return "succeeded";
  }
}

const calc = new Calculator();
calc.add(2, 3);
console.log(calc.flaky());
console.log(Object.isSealed(Calculator)); // true
