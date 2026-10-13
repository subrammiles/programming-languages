/*
Sequential vs parallel requests
await inside a loop runs requests ONE AFTER ANOTHER.
Start them all first, then await Promise.all, to run them at the SAME TIME.
*/
const base = "https://jsonplaceholder.typicode.com/users/";
const ids = [1, 2, 3, 4, 5];

async function sequential() {
  const start = Date.now();
  const users = [];
  for (const id of ids) {
    const res = await fetch(base + id);// waits for each one before starting the next
    users.push((await res.json()).name);
  }
  console.log("sequential:", Date.now() - start, "ms", users);
}

async function parallel() {
  const start = Date.now();
  const users = await Promise.all(
    ids.map(id => fetch(base + id).then(r => r.json()).then(u => u.name))
  );
  console.log("parallel:  ", Date.now() - start, "ms", users);
}

sequential()
  .then(parallel)
  .catch(e => console.log("network error:", e.message));
// parallel is usually several times faster
