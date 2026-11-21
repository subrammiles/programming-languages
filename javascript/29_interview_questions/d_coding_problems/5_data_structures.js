/*
Coding problems: data structures in JavaScript
JS has arrays, Map and Set built in, but no linked list, queue, or tree.
Interviews ask you to build them with classes.

  Stack  (LIFO)  -> an array with push / pop is enough
  Queue  (FIFO)  -> array.shift() is O(n); a linked list or head index gives O(1)
  Linked list, binary search tree -> nodes that point to other nodes
*/

console.log("<<<< Stack (array) >>>>");
const stack = [];
stack.push(1, 2, 3);
console.log(stack.pop(), stack.at(-1), stack.length);// 3 2 2

console.log("<<<< Queue with O(1) dequeue >>>>");
class Queue {
  #items = {};
  #head = 0;
  #tail = 0;
  enqueue(x) {
    this.#items[this.#tail++] = x;
  }
  dequeue() {
    if (this.size === 0) return undefined;
    const x = this.#items[this.#head];
    delete this.#items[this.#head++];
    return x;
  }
  get size() {
    return this.#tail - this.#head;
  }
}
const q = new Queue();
q.enqueue("a");
q.enqueue("b");
q.enqueue("c");
console.log(q.dequeue(), q.dequeue(), q.size);// a b 1

console.log("<<<< Singly linked list >>>>");
class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}
class LinkedList {
  head = null;
  append(value) {
    const node = new ListNode(value);
    if (!this.head) this.head = node;
    else {
      let cur = this.head;
      while (cur.next) cur = cur.next;
      cur.next = node;
    }
    return this;
  }
  *[Symbol.iterator]() {// makes the list work with for...of and spread
    for (let cur = this.head; cur; cur = cur.next) yield cur.value;
  }
}
const list = new LinkedList().append(1).append(2).append(3).append(4);
console.log([...list]);// [ 1, 2, 3, 4 ]

console.log("<<<< Reverse a linked list (most asked linked-list question) >>>>");
function reverseList(head) {
  let prev = null;
  let cur = head;
  while (cur) {
    const next = cur.next;// remember the rest
    cur.next = prev;// point backwards
    prev = cur;
    cur = next;
  }
  return prev;// the old tail is the new head
}
list.head = reverseList(list.head);
console.log([...list]);// [ 4, 3, 2, 1 ]

console.log("<<<< Middle of a list and cycle detection (slow / fast pointers) >>>>");
function middle(head) {
  let slow = head;
  let fast = head;
  while (fast?.next) {
    slow = slow.next;// 1 step
    fast = fast.next.next;// 2 steps: when fast reaches the end, slow is in the middle
  }
  return slow.value;
}
function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast?.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;// the fast pointer lapped the slow one
  }
  return false;
}
console.log(middle(list.head));// 2   (for an even length, the second middle)
const a = new ListNode("a");
a.next = new ListNode("b", new ListNode("c", a));// c points back to a
console.log(hasCycle(list.head), hasCycle(a));// false true

console.log("<<<< Binary search tree: insert, search, traversals >>>>");
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BST {
  root = null;
  insert(value) {
    const node = new TreeNode(value);
    if (!this.root) return (this.root = node), this;
    let cur = this.root;
    while (true) {
      const side = value < cur.value ? "left" : "right";
      if (!cur[side]) return (cur[side] = node), this;
      cur = cur[side];
    }
  }
  has(value) {
    let cur = this.root;
    while (cur) {
      if (value === cur.value) return true;
      cur = value < cur.value ? cur.left : cur.right;
    }
    return false;
  }
}
const inOrder = (n) => (n ? [...inOrder(n.left), n.value, ...inOrder(n.right)] : []);// sorted order
const preOrder = (n) => (n ? [n.value, ...preOrder(n.left), ...preOrder(n.right)] : []);
const height = (n) => (n ? 1 + Math.max(height(n.left), height(n.right)) : 0);
function levelOrder(root) {// breadth-first search with a queue
  const out = [];
  const queue = root ? [root] : [];
  while (queue.length) {
    const node = queue.shift();
    out.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return out;
}

//         8
//       /   \
//      3     10
//     / \      \
//    1   6      14
const tree = new BST();
[8, 3, 10, 1, 6, 14].forEach((v) => tree.insert(v));
console.log(inOrder(tree.root));// [ 1, 3, 6, 8, 10, 14 ]
console.log(preOrder(tree.root));// [ 8, 3, 1, 6, 10, 14 ]
console.log(levelOrder(tree.root));// [ 8, 3, 10, 1, 6, 14 ]
console.log(tree.has(6), tree.has(7), height(tree.root));// true false 3
