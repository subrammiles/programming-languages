/*
AbortController - cancelling async work
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  controller.abort();   // the fetch rejects with an AbortError
Common uses: user leaves the page, a newer search replaces an old one.
Many APIs accept a signal: fetch, addEventListener, setTimeout (timers/promises), fs, streams.
*/
async function main() {
  console.log("<<<< cancel a fetch >>>>");
  const controller = new AbortController();
  const request = fetch("https://jsonplaceholder.typicode.com/photos", {
    signal: controller.signal
  });
  controller.abort();// cancel immediately
  try {
    await request;
  } catch (e) {
    console.log(e.name);// AbortError
  }

  console.log("<<<< AbortSignal.timeout (built-in timeout) >>>>");
  try {
    await fetch("https://jsonplaceholder.typicode.com/photos", {
      signal: AbortSignal.timeout(1)// give up after 1ms
    });
  } catch (e) {
    console.log(e.name);// TimeoutError
  }

  console.log("<<<< abort your own async function >>>>");
  function countdown(seconds, signal) {
    return new Promise((resolve, reject) => {
      const id = setInterval(() => {
        console.log(seconds--);
        if (seconds < 0) { clearInterval(id); resolve("liftoff"); }
      }, 100);
      signal.addEventListener("abort", () => {
        clearInterval(id);
        reject(signal.reason);
      });
    });
  }
  const c2 = new AbortController();
  setTimeout(() => c2.abort(new Error("countdown cancelled")), 250);
  try {
    await countdown(5, c2.signal);// prints 5, 4 then stops
  } catch (e) {
    console.log(e.message);// countdown cancelled
  }
}
main();
