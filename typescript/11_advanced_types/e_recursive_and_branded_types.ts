/*
 Recursive types refer to themselves: trees, nested JSON, linked lists.
 Branded types add an invisible "brand" so two strings (or numbers) with
 different meanings can't be mixed up, e.g. a UserId and an OrderId.
*/

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
const config: Json = { name: "app", ports: [80, 443], tls: { enabled: true } };
console.log(JSON.stringify(config));

type TreeNode<T> = { value: T; children: TreeNode<T>[] };
const tree: TreeNode<string> = {
  value: "root",
  children: [{ value: "a", children: [] }, { value: "b", children: [{ value: "b1", children: [] }] }],
};
const count = (n: TreeNode<unknown>): number => 1 + n.children.reduce((s, c) => s + count(c), 0);
console.log(count(tree)); // 4

type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };
const userId = (s: string) => s as UserId;
const orderId = (s: string) => s as OrderId;

function cancelOrder(id: OrderId): string {
  return `cancelled ${id}`;
}
console.log(cancelOrder(orderId("o-7")));
// cancelOrder(userId("u-1")); // error: a UserId is not an OrderId
// cancelOrder("o-7");         // error: a plain string is not an OrderId either
void userId;
