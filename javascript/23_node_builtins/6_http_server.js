/*
HTTP server with node:http
Frameworks like Express, Fastify and Koa are built on this module.
  http.createServer((req, res) => { ... })
    req -> the request: method, url, headers, and the body as a stream
    res -> the response: statusCode, setHeader(), end(body)

This file starts a server, sends it a few requests with fetch, then shuts it down,
so it runs and exits by itself. To play with it in a browser, change the bottom to
`server.listen(3000)` and open http://localhost:3000/hello?name=you
*/
const http = require("node:http");

const todos = [{ id: 1, title: "learn node:http", done: false }];

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

async function readBody(req) {
  let body = "";
  for await (const chunk of req) body += chunk;// the request body arrives as a stream
  return body ? JSON.parse(body) : {};
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(`  server got: ${req.method} ${url.pathname}${url.search}`);

  try {
    if (req.method === "GET" && url.pathname === "/hello") {
      const name = url.searchParams.get("name") ?? "world";
      res.setHeader("Content-Type", "text/plain");
      return res.end(`Hello, ${name}!`);
    }
    if (req.method === "GET" && url.pathname === "/todos") {
      return sendJson(res, 200, todos);
    }
    if (req.method === "POST" && url.pathname === "/todos") {
      const { title } = await readBody(req);
      if (!title) return sendJson(res, 400, { error: "title is required" });
      const todo = { id: todos.length + 1, title, done: false };
      todos.push(todo);
      return sendJson(res, 201, todo);
    }
    sendJson(res, 404, { error: "not found" });
  } catch (err) {
    sendJson(res, 500, { error: err.message });// e.g. invalid JSON in the body
  }
});

async function runDemo(base) {
  console.log("<<<< GET with a query string >>>>");
  let res = await fetch(`${base}/hello?name=Ann`);
  console.log(res.status, await res.text());// 200 Hello, Ann!

  console.log("<<<< POST JSON >>>>");
  res = await fetch(`${base}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "write tests" }),
  });
  console.log(res.status, await res.json());// 201 { id: 2, title: 'write tests', done: false }

  console.log("<<<< validation error and 404 >>>>");
  res = await fetch(`${base}/todos`, { method: "POST", body: "{}" });
  console.log(res.status, await res.json());// 400 { error: 'title is required' }
  res = await fetch(`${base}/nope`);
  console.log(res.status);// 404

  console.log("<<<< GET JSON >>>>");
  res = await fetch(`${base}/todos`);
  console.log((await res.json()).map((t) => t.title));// [ 'learn node:http', 'write tests' ]
}

// Port 0 = let the OS pick a free port, so the demo never clashes with another server
server.listen(0, async () => {
  const { port } = server.address();
  console.log(`listening on http://localhost:${port}`);
  await runDemo(`http://localhost:${port}`);
  server.close(() => console.log("server closed"));
});
