"""
Searching and sorting algorithms, written by hand.
In real code use sorted() / list.sort() (Timsort: O(n log n), stable) and the bisect module.

  Algorithm        Best        Average     Worst       Extra memory   Stable
  Bubble sort      O(n)        O(n^2)      O(n^2)      O(1)           yes
  Selection sort   O(n^2)      O(n^2)      O(n^2)      O(1)           no
  Insertion sort   O(n)        O(n^2)      O(n^2)      O(1)           yes
  Merge sort       O(n log n)  O(n log n)  O(n log n)  O(n)           yes
  Quick sort       O(n log n)  O(n log n)  O(n^2)      O(log n)       no
  Heap sort        O(n log n)  O(n log n)  O(n log n)  O(1)           no
"""
import bisect
import heapq


def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1


def bubble_sort(a):
    a = a[:]
    for end in range(len(a) - 1, 0, -1):
        swapped = False
        for i in range(end):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]
                swapped = True
        if not swapped:
            break
    return a


def selection_sort(a):
    a = a[:]
    for i in range(len(a) - 1):
        m = min(range(i, len(a)), key=a.__getitem__)
        a[i], a[m] = a[m], a[i]
    return a


def insertion_sort(a):
    a = a[:]
    for i in range(1, len(a)):
        key, j = a[i], i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a


def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out + left[i:] + right[j:]


def quick_sort(a):
    if len(a) <= 1:
        return a
    pivot, *rest = a
    return quick_sort([x for x in rest if x < pivot]) + [pivot] + quick_sort([x for x in rest if x >= pivot])


def heap_sort(a):
    h = a[:]
    heapq.heapify(h)                                 # O(n)
    return [heapq.heappop(h) for _ in range(len(h))]


sorted_nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(sorted_nums, 23), binary_search(sorted_nums, 7))   # 5 -1
print(bisect.bisect_left(sorted_nums, 23), bisect.bisect_left(sorted_nums, 7))   # 5 2   (insertion point)

data = [64, 34, 25, 12, 22, 11, 90]
for sort in (bubble_sort, selection_sort, insertion_sort, merge_sort, quick_sort, heap_sort):
    print(f"{sort.__name__:15}", sort(data))
# each line: [11, 12, 22, 25, 34, 64, 90]

# Sorting in practice: key functions and stability
people = [("ann", "HR", 30), ("bo", "IT", 25), ("cy", "HR", 25), ("dee", "IT", 30)]
print(sorted(people, key=lambda p: (p[1], -p[2], p[0])))   # by dept, age descending, then name
# [('ann', 'HR', 30), ('cy', 'HR', 25), ('dee', 'IT', 30), ('bo', 'IT', 25)]
print([p[0] for p in sorted(people, key=lambda p: p[2])])  # ['bo', 'cy', 'ann', 'dee']   (stable: ties keep order)
print(heapq.nlargest(2, people, key=lambda p: p[2]))       # [('ann', 'HR', 30), ('dee', 'IT', 30)]
print(sorted(["banana", "Apple", "cherry"], key=str.lower))   # ['Apple', 'banana', 'cherry']
