"""
Stack (last in, first out): list.append + list.pop  -> fast
Queue (first in, first out): use collections.deque; list.pop(0) is slow on big lists
"""
from collections import deque

print("<<<< stack >>>>")
stack = []
stack.append("page1")
stack.append("page2")
stack.append("page3")
print(stack.pop())  # page3 -> "back" button
print(stack)  # ['page1', 'page2']

print("<<<< queue >>>>")
queue = deque(["Asha", "Ravi"])
queue.append("Meena")  # join the back
print(queue.popleft())  # Asha -> served first
print(queue)  # deque(['Ravi', 'Meena'])
