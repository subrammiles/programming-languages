/*
Small habits that let the compiler catch more bugs:
 - assertNever in switches: adding a new union member breaks the build until it's handled
 - readonly data and "as const": prevent accidental mutation
 - avoid any; prefer unknown + narrowing
 - let inference work for locals, annotate function boundaries
*/

function assertNever(value: never): never {
  throw new Error(`unhandled value: ${JSON.stringify(value)}`);
}

type PaymentMethod = "card" | "upi" | "cash";

function fee(method: PaymentMethod, amount: number): number {
  switch (method) {
    case "card":
      return amount * 0.02;
    case "upi":
      return 0;
    case "cash":
      return 5;
    default:
      return assertNever(method); // add "wallet" to PaymentMethod and this line errors
  }
}

console.log(fee("card", 1000), fee("upi", 1000), fee("cash", 1000)); // 20 0 5

const CONFIG = {
  retries: 3,
  endpoints: ["https://a.example.com", "https://b.example.com"],
} as const;
// CONFIG.endpoints.push("x"); // error: readonly array
console.log(CONFIG.endpoints.length);

function total(items: readonly { price: number }[]): number {
  return items.reduce((s, i) => s + i.price, 0); // can't mutate the caller's data
}
console.log(total([{ price: 10 }, { price: 15 }])); // 25
