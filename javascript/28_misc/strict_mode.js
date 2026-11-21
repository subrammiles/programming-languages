/*
Strict mode ("use strict")
An opt-in, safer version of JS that turns silent mistakes into errors.
Turn it on with "use strict"; at the top of a file or function.

It is ON automatically in:
  - ES modules (.mjs files, or "type": "module" in package.json)
  - class bodies
So modern code is almost always strict. This file is CommonJS, which is NOT strict
by default, so each example below enables strict mode inside a function.
*/

function check(label, sloppy, strict) {
  const run = (fn) => {
    try {
      return String(fn());
    } catch (e) {
      return `${e.constructor.name}: ${e.message}`;
    }
  };
  console.log(`<<<< ${label} >>>>`);
  console.log("  sloppy:", run(sloppy));
  console.log("  strict:", run(strict));
}

check(
  "assigning to an undeclared variable",
  function () {
    typo1 = 5;// creates a global by accident
    return "created global typo1 = " + globalThis.typo1;
  },
  function () {
    "use strict";
    typo2 = 5;
  },
);
//   sloppy: created global typo1 = 5
//   strict: ReferenceError: typo2 is not defined

check(
  "`this` in a plain function call",
  function () {
    return this === globalThis ? "globalThis" : this;
  },
  function () {
    "use strict";
    return this;
  },
);
//   sloppy: globalThis
//   strict: undefined

check(
  "writing to a read-only property",
  function () {
    const o = Object.freeze({ x: 1 });
    o.x = 2;// silently ignored
    return "x is still " + o.x;
  },
  function () {
    "use strict";
    const o = Object.freeze({ x: 1 });
    o.x = 2;
  },
);
//   sloppy: x is still 1
//   strict: TypeError: Cannot assign to read only property 'x' of object '#<Object>'

check(
  "deleting a non-deletable property",
  function () {
    return delete Object.prototype;// false, no error
  },
  function () {
    "use strict";
    return delete Object.prototype;
  },
);
//   sloppy: false
//   strict: TypeError: Cannot delete property 'prototype' of function Object() { [native code] }

check(
  "duplicate parameter names (a SyntaxError, so checked with new Function)",
  () => typeof new Function("a", "a", "return a"),
  () => new Function("a", "a", '"use strict"; return a'),
);
//   sloppy: function
//   strict: SyntaxError: Duplicate parameter name not allowed in this context

check(
  "octal literals like 010",
  () => new Function("return 010")(),
  () => new Function('"use strict"; return 010'),
);
//   sloppy: 8
//   strict: SyntaxError: Octal literals are not allowed in strict mode.

// Strict mode also forbids `with`, makes `eval` keep its variables to itself,
// and reserves words for the future (let, static, implements, interface, ...).
