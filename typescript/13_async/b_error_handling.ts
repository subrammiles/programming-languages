/*
Uses a parameter property (readonly status), so run with:
  node --experimental-transform-types 13_async/b_error_handling.ts

Errors in catch blocks are typed "unknown" (with "strict" / useUnknownInCatchVariables),
because JavaScript can throw ANYTHING, not just Error objects. Narrow before using it.
*/

class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

function errorMessage(error: unknown): string {
  if (error instanceof HttpError) return `HTTP ${error.status}: ${error.message}`;
  if (error instanceof Error) return error.message;
  return String(error);
}

const attempts: Array<() => never> = [
  () => {
    throw new HttpError(404, "not found");
  },
  () => {
    throw new TypeError("bad input");
  },
  () => {
    throw "a plain string"; // legal JavaScript, sadly
  },
];

for (const attempt of attempts) {
  try {
    attempt();
  } catch (error) {
    // error: unknown
    console.log(errorMessage(error));
  }
}

const wrapped = new Error("loading config failed", { cause: new HttpError(500, "server error") });
console.log(errorMessage(wrapped.cause)); // HTTP 500: server error
