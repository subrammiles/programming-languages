/*
fetch(url) - making HTTP requests
Built into browsers and Node 18+. Returns a promise of a Response.
Important: fetch only rejects on NETWORK errors.
A 404 or 500 still FULFILLS; check response.ok yourself.
These examples call https://jsonplaceholder.typicode.com (a free fake API), so you need internet.
*/
async function getTodo(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  console.log(response.status, response.ok);// 200 true
  const data = await response.json();// body is read separately, also async
  return data;
}

async function main() {
  console.log(await getTodo(1));
  // { userId: 1, id: 1, title: 'delectus aut autem', completed: false }

  console.log("<<<< 404 does not throw >>>>");
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/999999");
  console.log(res.status, res.ok);// 404 false

  console.log("<<<< a safe wrapper >>>>");
  async function getJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.json();
  }
  try {
    await getJson("https://jsonplaceholder.typicode.com/todos/999999");
  } catch (e) {
    console.log(e.message);// HTTP 404 for https://...
  }

  console.log("<<<< query parameters >>>>");
  const url = new URL("https://jsonplaceholder.typicode.com/comments");
  url.searchParams.set("postId", "1");
  const comments = await getJson(url);
  console.log(comments.length);// 5
}

main().catch(e => console.log("network error:", e.message));
