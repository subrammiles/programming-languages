/*
Tests with Node's built-in test runner: no Jest or Vitest needed.
Node runs .ts test files directly.
  npm test                                   (runs every *.test.ts file)
  node --test 17_testing/                    (just this folder)
  node --test --watch 17_testing/            (re-run on save)
  node --test --experimental-test-coverage   (coverage)
*/

import { describe, it, mock, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { Cart, fetchPrice } from "./cart.ts";

describe("Cart", () => {
  let cart: Cart;
  beforeEach(() => {
    cart = new Cart();
  });

  it("starts empty", () => {
    assert.equal(cart.size, 0);
    assert.equal(cart.total(), 0);
  });

  it("adds up prices and quantities", () => {
    cart.add("pen", 10, 3);
    cart.add("book", 250);
    assert.equal(cart.total(), 280);
  });

  it("merges the same item", () => {
    cart.add("pen", 10);
    cart.add("pen", 10, 2);
    assert.equal(cart.size, 1);
    assert.equal(cart.total(), 30);
  });

  for (const [discount, expected] of [
    [0, 100],
    [10, 90],
    [50, 50],
  ] as const) {
    it(`applies a ${discount}% discount`, () => {
      cart.add("item", 100);
      assert.equal(cart.total(discount), expected);
    });
  }

  it("rejects a zero quantity", () => {
    assert.throws(() => cart.add("pen", 10, 0), RangeError);
  });
});

describe("fetchPrice", () => {
  it("uses the lookup function", async () => {
    const lookup = mock.fn(async (_name: string) => 99);
    assert.equal(await fetchPrice("pen", lookup), 99);
    assert.equal(lookup.mock.callCount(), 1);
    assert.deepEqual(lookup.mock.calls[0]?.arguments, ["pen"]);
  });

  it("rejects negative prices", async () => {
    await assert.rejects(fetchPrice("pen", async () => -1), /bad price/);
  });
});
