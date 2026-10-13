/*
Custom error classes
Extend Error to create your own error types.
Then use instanceof to handle each kind differently.
*/
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NotFoundError extends Error {
  constructor(resource) {
    super(`${resource} not found`);
    this.name = "NotFoundError";
  }
}

function getUser(id) {
  if (typeof id !== "number") throw new ValidationError("id", "id must be a number");
  if (id > 100) throw new NotFoundError(`User ${id}`);
  return { id, name: "Asha" };
}

for (const id of [1, "abc", 500]) {
  try {
    console.log(getUser(id));
  } catch (err) {
    if (err instanceof ValidationError) {
      console.log(`Bad input on "${err.field}": ${err.message}`);
    } else if (err instanceof NotFoundError) {
      console.log(`404: ${err.message}`);
    } else {
      throw err;// unknown error -> rethrow, don't swallow it
    }
  }
}
// { id: 1, name: 'Asha' }
// Bad input on "id": id must be a number
// 404: User 500 not found

console.log(new ValidationError("x", "y") instanceof Error);// true
console.log(new ValidationError("x", "y").stack.split("\n")[0]);// ValidationError: y
