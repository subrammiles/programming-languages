/*
A Result type makes failure part of the return type, so callers can't forget to handle it.
(An alternative to throwing for EXPECTED failures like validation; keep exceptions for bugs.)
*/

type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };

const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

function parseAge(input: string): Result<number> {
  const n = Number(input);
  if (!Number.isInteger(n)) return err(`"${input}" is not a whole number`);
  if (n < 0 || n > 150) return err(`${n} is out of range`);
  return ok(n);
}

for (const input of ["30", "abc", "200"]) {
  const result = parseAge(input);
  if (result.ok) console.log("age:", result.value + 1); // value only exists when ok is true
  else console.log("error:", result.error);
}
// age: 31
// error: "abc" is not a whole number
// error: 200 is out of range
