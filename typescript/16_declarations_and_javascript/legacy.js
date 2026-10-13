// A plain JavaScript file, typed with JSDoc comments.
// TypeScript reads these comments, so JS projects get type checking without converting to .ts
// (enable "checkJs", or add // @ts-check at the top of a file).
// @ts-check

/**
 * @param {number} price
 * @param {number} [taxRate=0.18]
 * @returns {number}
 */
export function withTax(price, taxRate = 0.18) {
  return Math.round(price * (1 + taxRate) * 100) / 100;
}

/** @typedef {{ name: string, qty: number }} LineItem */

/**
 * @param {LineItem[]} items
 */
export function totalQuantity(items) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}
