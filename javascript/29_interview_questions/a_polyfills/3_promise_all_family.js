/*
Polyfills: Promise.all, allSettled, race, any
  all        -> resolves with every value (in input order); rejects on the FIRST rejection
  allSettled -> never rejects; gives {status, value | reason} for each
  race       -> settles like the FIRST promise to settle (resolve or reject)
  any        -> resolves with the FIRST success; rejects with AggregateError if all fail

Key details:
  - results keep the INPUT order, not the order they finish in
  - inputs may be plain values, so wrap each with Promise.resolve()
  - an empty input: all/allSettled resolve to [], any rejects, race stays pending forever
*/

function promiseAll(items) {
  return new Promise((resolve, reject) => {
    const list = [...items];
    const results = new Array(list.length);
    let remaining = list.length;
    if (remaining === 0) return resolve(results);
    list.forEach((item, i) => {
      Promise.resolve(item).then((value) => {
        results[i] = value;// store by index to keep input order
        if (--remaining === 0) resolve(results);
      }, reject);// the first rejection wins; later calls to reject are ignored
    });
  });
}

function promiseAllSettled(items) {
  return promiseAll(
    [...items].map((item) =>
      Promise.resolve(item).then(
        (value) => ({ status: "fulfilled", value }),
        (reason) => ({ status: "rejected", reason }),
      ),
    ),
  );
}

function promiseRace(items) {
  return new Promise((resolve, reject) => {
    for (const item of items) Promise.resolve(item).then(resolve, reject);
  });
}

function promiseAny(items) {
  return new Promise((resolve, reject) => {
    const list = [...items];
    const errors = new Array(list.length);
    let remaining = list.length;
    if (remaining === 0) return reject(new AggregateError([], "All promises were rejected"));
    list.forEach((item, i) => {
      Promise.resolve(item).then(resolve, (err) => {
        errors[i] = err;
        if (--remaining === 0) reject(new AggregateError(errors, "All promises were rejected"));
      });
    });
  });
}

const delay = (ms, value, fail = false) =>
  new Promise((resolve, reject) => setTimeout(() => (fail ? reject(new Error(value)) : resolve(value)), ms));

async function main() {
  console.log("<<<< promiseAll: input order is kept >>>>");
  console.log(await promiseAll([delay(30, "slow"), delay(10, "fast"), 42]));
  // [ 'slow', 'fast', 42 ]

  try {
    await promiseAll([delay(10, "ok"), delay(20, "boom", true)]);
  } catch (e) {
    console.log("rejected:", e.message);// rejected: boom
  }

  console.log("<<<< promiseAllSettled >>>>");
  const settled = await promiseAllSettled([delay(10, "ok"), delay(5, "bad", true)]);
  console.log(settled.map((r) => (r.status === "fulfilled" ? r.value : r.reason.message)));
  // [ 'ok', 'bad' ]

  console.log("<<<< promiseRace >>>>");
  console.log(await promiseRace([delay(30, "turtle"), delay(10, "rabbit")]));// rabbit

  console.log("<<<< promiseAny >>>>");
  console.log(await promiseAny([delay(5, "x", true), delay(20, "first success")]));// first success
  try {
    await promiseAny([delay(5, "a", true), delay(10, "b", true)]);
  } catch (e) {
    console.log(e.constructor.name, e.errors.map((err) => err.message));// AggregateError [ 'a', 'b' ]
  }
}

main();
