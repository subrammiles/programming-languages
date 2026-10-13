/*
fetch returns untyped JSON (Promise<any>). A small generic helper gives the result a type,
and a runtime check makes sure the data really has that shape.
This example starts a local server, so it needs no internet.
*/

import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

type Todo = { id: number; title: string; completed: boolean };

function isTodo(value: unknown): value is Todo {
  const v = value as Partial<Todo>;
  return typeof v?.id === "number" && typeof v.title === "string" && typeof v.completed === "boolean";
}

async function getJson<T>(url: string, guard: (v: unknown) => v is T, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, signal ? { signal } : {});
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data: unknown = await response.json();
  if (!guard(data)) throw new Error("unexpected response shape");
  return data;
}

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.url === "/todos/1") res.end(JSON.stringify({ id: 1, title: "Learn TypeScript", completed: false }));
  else if (req.url === "/broken") res.end(JSON.stringify({ id: "x" }));
  else {
    res.statusCode = 404;
    res.end("{}");
  }
});
await new Promise<void>((resolve) => server.listen(0, resolve));
const base = `http://localhost:${(server.address() as AddressInfo).port}`;

const todo = await getJson(`${base}/todos/1`, isTodo);
console.log(todo.title.toUpperCase()); // LEARN TYPESCRIPT

for (const path of ["/broken", "/missing"]) {
  try {
    await getJson(base + path, isTodo, AbortSignal.timeout(2000));
  } catch (e) {
    console.log(path, "->", (e as Error).message);
  }
}
// /broken -> unexpected response shape
// /missing -> HTTP 404
server.close();
