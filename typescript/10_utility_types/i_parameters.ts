/*
Parameters<F> extracts a function's parameter types as a tuple.
*/

type PointPrinter = (p: { x: number; y: number }) => void;
const point: Parameters<PointPrinter>[0] = { x: 10, y: 20 };
console.log(point);

function sendEmail(to: string, subject: string, urgent = false): string {
  return `${urgent ? "[URGENT] " : ""}${subject} -> ${to}`;
}
type EmailArgs = Parameters<typeof sendEmail>; // [to: string, subject: string, urgent?: boolean]
const queued: EmailArgs[] = [
  ["a@x.com", "Hello"],
  ["b@x.com", "Server down", true],
];
for (const args of queued) console.log(sendEmail(...args));
