/*
Testing with Node's built-in test runner (Node 18+, stable in 20)
No Jest or Mocha needed.
Run:
  node --test                 -> finds and runs every *.test.js file
  node --test --watch         -> re-runs when files change
  node --test --experimental-test-coverage
*/
const { describe, it, beforeEach, mock } = require("node:test");
const assert = require("node:assert/strict");
const { add, divide, fetchDouble } = require("./math");

describe("add", () => {
  it("adds two positive numbers", () => {
    assert.equal(add(2, 3), 5);
  });

  it("works with negatives", () => {
    assert.equal(add(-2, -3), -5);
  });

  it("has floating point surprises", () => {
    assert.notEqual(add(0.1, 0.2), 0.3);// 0.30000000000000004
    assert.ok(Math.abs(add(0.1, 0.2) - 0.3) < Number.EPSILON);
  });
});

describe("divide", () => {
  it("divides", () => {
    assert.equal(divide(10, 2), 5);
  });

  it("throws on divide by zero", () => {
    assert.throws(() => divide(1, 0), { message: "Cannot divide by zero" });
  });
});

describe("async code", () => {
  it("awaits the result", async () => {
    assert.equal(await fetchDouble(4), 8);
  });

  it("checks rejected promises", async () => {
    await assert.rejects(Promise.reject(new Error("boom")), /boom/);
  });
});

describe("objects and arrays", () => {
  let cart;
  beforeEach(() => {
    cart = { items: ["pen"], total: 10 };// fresh copy before every test
  });

  it("deepEqual compares contents, not references", () => {
    assert.deepEqual(cart, { items: ["pen"], total: 10 });
  });

  it("each test gets its own cart", () => {
    cart.items.push("book");
    assert.equal(cart.items.length, 2);
  });
});

describe("mocking", () => {
  it("records calls to a fake function", () => {
    const sendEmail = mock.fn(() => true);
    ["a@x.com", "b@x.com"].forEach(email => sendEmail(email));
    assert.equal(sendEmail.mock.callCount(), 2);
    assert.deepEqual(sendEmail.mock.calls[0].arguments, ["a@x.com"]);
  });
});
