/*
Using a Proxy for validation
The set trap can reject bad values before they are stored.
*/
function createPerson() {
  return new Proxy({}, {
    set(target, prop, value) {
      if (prop === "age") {
        if (!Number.isInteger(value)) throw new TypeError("age must be an integer");
        if (value < 0 || value > 150) throw new RangeError("age must be 0-150");
      }
      if (prop === "email" && !String(value).includes("@")) {
        throw new TypeError("invalid email");
      }
      target[prop] = value;
      return true;
    },
    deleteProperty(target, prop) {
      if (prop === "id") throw new Error("id cannot be deleted");
      delete target[prop];
      return true;
    }
  });
}

const p = createPerson();
p.id = 1;
p.age = 25;
p.email = "asha@example.com";
console.log(p);// { id: 1, age: 25, email: 'asha@example.com' }

for (const action of [() => (p.age = "old"), () => (p.age = 200), () => (p.email = "nope"), () => delete p.id]) {
  try {
    action();
  } catch (e) {
    console.log(`${e.constructor.name}: ${e.message}`);
  }
}
// TypeError: age must be an integer
// RangeError: age must be 0-150
// TypeError: invalid email
// Error: id cannot be deleted
