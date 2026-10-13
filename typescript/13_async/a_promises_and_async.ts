/*
Typing asynchronous code
 Promise<T>              a value of type T that arrives later
 async function f(): Promise<T>
 await                   unwraps the Promise
 Promise.all / allSettled / race keep precise tuple types
*/

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type User = { id: number; name: string };

async function fetchUser(id: number): Promise<User> {
  await sleep(50);
  if (id <= 0) throw new Error(`invalid id ${id}`);
  return { id, name: `user${id}` };
}

async function fetchCount(): Promise<number> {
  await sleep(30);
  return 42;
}

const user = await fetchUser(1); // top-level await works in modules
console.log(user.name); // user1

const [u2, count] = await Promise.all([fetchUser(2), fetchCount()]); // [User, number]
console.log(u2.id, count); // 2 42

const results = await Promise.allSettled([fetchUser(3), fetchUser(-1)]);
for (const r of results) {
  if (r.status === "fulfilled") console.log("ok", r.value.name);
  else console.log("failed", (r.reason as Error).message);
}
// ok user3
// failed invalid id -1
