/*
ReturnType<F> extracts the return type of a function type.
Awaited<T> unwraps a Promise.
Handy when a library function returns a type it doesn't export.
*/

type PointGenerator = () => { x: number; y: number };
const point: ReturnType<PointGenerator> = { x: 10, y: 20 };
console.log(point);

function createSession(user: string) {
  return { user, token: "abc", expires: new Date(0) };
}
type Session = ReturnType<typeof createSession>; // { user: string; token: string; expires: Date }
const s: Session = createSession("asha");
console.log(s.user);

async function loadCount(): Promise<number> {
  return 42;
}
type Count = Awaited<ReturnType<typeof loadCount>>; // number
const c: Count = await loadCount();
console.log(c);
