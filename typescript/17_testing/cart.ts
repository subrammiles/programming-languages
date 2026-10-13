/*
The code under test.
*/

export type Item = { name: string; price: number; qty: number };

export class Cart {
  #items = new Map<string, Item>();

  add(name: string, price: number, qty = 1): void {
    if (qty <= 0) throw new RangeError("qty must be positive");
    const existing = this.#items.get(name);
    this.#items.set(name, { name, price, qty: (existing?.qty ?? 0) + qty });
  }

  total(discountPercent = 0): number {
    let sum = 0;
    for (const item of this.#items.values()) sum += item.price * item.qty;
    return Math.round(sum * (100 - discountPercent)) / 100;
  }

  get size(): number {
    return this.#items.size;
  }
}

export async function fetchPrice(name: string, lookup: (n: string) => Promise<number>): Promise<number> {
  const price = await lookup(name);
  if (price < 0) throw new Error(`bad price for ${name}`);
  return price;
}
