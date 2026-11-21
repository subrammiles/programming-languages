"""
Data structures asked in Python interviews, built from scratch:
linked list, stack, queue, binary search tree, LRU cache, min-heap, trie, graph (BFS / DFS).
The standard library versions: list (stack), collections.deque (queue), heapq (heap),
collections.OrderedDict / functools.lru_cache (LRU).
"""
from collections import OrderedDict, deque


# ---- Singly linked list ----
class ListNode:
    def __init__(self, val, next=None):
        self.val, self.next = val, next


def from_list(values):
    head = None
    for v in reversed(values):
        head = ListNode(v, head)
    return head


def to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out


def reverse_list(head):
    prev = None
    while head:
        head.next, prev, head = prev, head, head.next   # careful: right side is evaluated first
    return prev


def middle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    return slow.val


def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast:
            return True
    return False


print(to_list(reverse_list(from_list([1, 2, 3, 4, 5]))))   # [5, 4, 3, 2, 1]
print(middle(from_list([1, 2, 3, 4, 5])))                  # 3
loop = from_list([1, 2, 3])
loop.next.next.next = loop
print(has_cycle(loop), has_cycle(from_list([1, 2])))        # True False


# ---- Stack and queue ----
stack = []
stack.append(1); stack.append(2); stack.append(3)
print(stack.pop(), stack[-1])                # 3 2

queue = deque()                              # O(1) at both ends (list.pop(0) is O(n))
queue.append("a"); queue.append("b"); queue.append("c")
print(queue.popleft(), queue.popleft())      # a b


class MinStack:
    """push / pop / get_min all O(1)."""

    def __init__(self):
        self._items = []                     # (value, min so far)

    def push(self, x):
        self._items.append((x, min(x, self._items[-1][1]) if self._items else x))

    def pop(self):
        return self._items.pop()[0]

    def get_min(self):
        return self._items[-1][1]


ms = MinStack()
for x in (5, 2, 8):
    ms.push(x)
print(ms.get_min()); ms.pop(); ms.pop(); print(ms.get_min())   # 2  then  5


# ---- Binary search tree ----
class BST:
    class _Node:
        __slots__ = ("key", "left", "right")

        def __init__(self, key):
            self.key, self.left, self.right = key, None, None

    def __init__(self, keys=()):
        self.root = None
        for k in keys:
            self.insert(k)

    def insert(self, key):
        def _insert(node):
            if node is None:
                return BST._Node(key)
            if key < node.key:
                node.left = _insert(node.left)
            elif key > node.key:
                node.right = _insert(node.right)
            return node
        self.root = _insert(self.root)

    def __contains__(self, key):             # enables: key in tree
        node = self.root
        while node:
            if key == node.key:
                return True
            node = node.left if key < node.key else node.right
        return False

    def __iter__(self):                      # in-order traversal = sorted order
        def walk(node):
            if node:
                yield from walk(node.left)
                yield node.key
                yield from walk(node.right)
        return walk(self.root)

    def level_order(self):
        out, q = [], deque([self.root] if self.root else [])
        while q:
            node = q.popleft()
            out.append(node.key)
            q.extend(child for child in (node.left, node.right) if child)
        return out

    def height(self, node="root"):
        node = self.root if node == "root" else node
        return 0 if node is None else 1 + max(self.height(node.left), self.height(node.right))


tree = BST([8, 3, 10, 1, 6, 14])
print(list(tree), tree.level_order())        # [1, 3, 6, 8, 10, 14] [8, 3, 10, 1, 6, 14]
print(6 in tree, 7 in tree, tree.height())   # True False 3


# ---- LRU cache ----
class LRUCache:
    def __init__(self, capacity):
        self.capacity, self.data = capacity, OrderedDict()

    def get(self, key):
        if key not in self.data:
            return -1
        self.data.move_to_end(key)           # mark as most recently used
        return self.data[key]

    def put(self, key, value):
        self.data[key] = value
        self.data.move_to_end(key)
        if len(self.data) > self.capacity:
            self.data.popitem(last=False)    # remove the least recently used


lru = LRUCache(3)
for k in "abc":
    lru.put(k, ord(k))
lru.get("a")
lru.put("d", 100)
print(list(lru.data), lru.get("b"))          # ['c', 'a', 'd'] -1


# ---- Min-heap from scratch (heapq does this for you) ----
class MinHeap:
    def __init__(self):
        self.h = []

    def push(self, x):
        self.h.append(x)
        i = len(self.h) - 1
        while i > 0 and self.h[(i - 1) // 2] > self.h[i]:          # sift up
            parent = (i - 1) // 2
            self.h[i], self.h[parent] = self.h[parent], self.h[i]
            i = parent

    def pop(self):
        h = self.h
        h[0], h[-1] = h[-1], h[0]
        smallest = h.pop()
        i = 0
        while True:                                                # sift down
            l, r, m = 2 * i + 1, 2 * i + 2, i
            if l < len(h) and h[l] < h[m]:
                m = l
            if r < len(h) and h[r] < h[m]:
                m = r
            if m == i:
                return smallest
            h[i], h[m] = h[m], h[i]
            i = m


heap = MinHeap()
for x in (5, 3, 8, 1, 9, 2):
    heap.push(x)
print([heap.pop() for _ in range(6)])        # [1, 2, 3, 5, 8, 9]


# ---- Trie (prefix tree): autocomplete ----
class Trie:
    def __init__(self):
        self.root = {}

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node["$"] = True                     # end-of-word marker

    def starts_with(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node:
                return []
            node = node[ch]
        words = []

        def collect(n, path):
            if "$" in n:
                words.append(prefix + path)
            for ch, child in sorted(n.items()):
                if ch != "$":
                    collect(child, path + ch)
        collect(node, "")
        return words


t = Trie()
for w in ("car", "card", "care", "cat", "dog"):
    t.insert(w)
print(t.starts_with("car"), t.starts_with("z"))   # ['car', 'card', 'care'] []


# ---- Graph: BFS shortest path and DFS ----
graph = {"A": ["B", "C"], "B": ["A", "D", "E"], "C": ["A", "E"], "D": ["B", "F"], "E": ["B", "C"], "F": ["D"]}


def shortest_path(g, start, goal):
    prev, q = {start: None}, deque([start])
    while q:
        node = q.popleft()
        if node == goal:
            path = []
            while node:
                path.append(node)
                node = prev[node]
            return path[::-1]
        for nxt in g[node]:
            if nxt not in prev:
                prev[nxt] = node
                q.append(nxt)
    return None


def dfs(g, node, seen=None):
    seen = seen if seen is not None else []
    seen.append(node)
    for nxt in g[node]:
        if nxt not in seen:
            dfs(g, nxt, seen)
    return seen


print(shortest_path(graph, "C", "F"))   # ['C', 'A', 'B', 'D', 'F']
print(dfs(graph, "A"))                  # ['A', 'B', 'D', 'F', 'E', 'C']
