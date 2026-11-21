/*
Coding problems: searching and sorting
In real code use arr.sort((a, b) => a - b) (an O(n log n) TimSort).
Interviews still ask you to write these by hand and explain their complexity.

  Algorithm        Best        Average     Worst       Extra memory   Stable
  Bubble sort      O(n)        O(n^2)      O(n^2)      O(1)           yes
  Selection sort   O(n^2)      O(n^2)      O(n^2)      O(1)           no
  Insertion sort   O(n)        O(n^2)      O(n^2)      O(1)           yes
  Merge sort       O(n log n)  O(n log n)  O(n log n)  O(n)           yes
  Quick sort       O(n log n)  O(n log n)  O(n^2)      O(log n)       no
*/

console.log("<<<< Linear search: O(n) >>>>");
const linearSearch = (arr, target) => {
  for (let i = 0; i < arr.length; i++) if (arr[i] === target) return i;
  return -1;
};
console.log(linearSearch([5, 3, 8, 1], 8));// 2

console.log("<<<< Binary search: O(log n), the array MUST be sorted >>>>");
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;// target is in the right half
    else high = mid - 1;// target is in the left half
  }
  return -1;
}
const sortedNums = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(sortedNums, 11), binarySearch(sortedNums, 4));// 5 -1

const input = [64, 34, 25, 12, 22, 11, 90];

console.log("<<<< Bubble sort: swap neighbours; the largest 'bubbles' to the end >>>>");
function bubbleSort(source) {
  const arr = [...source];
  for (let end = arr.length - 1; end > 0; end--) {
    let swapped = false;
    for (let i = 0; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    if (!swapped) break;// already sorted: stop early (best case O(n))
  }
  return arr;
}
console.log(bubbleSort(input));// [ 11, 12, 22, 25, 34, 64, 90 ]

console.log("<<<< Selection sort: pick the smallest, put it next >>>>");
function selectionSort(source) {
  const arr = [...source];
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) if (arr[j] < arr[min]) min = j;
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}
console.log(selectionSort(input));// [ 11, 12, 22, 25, 34, 64, 90 ]

console.log("<<<< Insertion sort: insert each item into the sorted left part >>>>");
function insertionSort(source) {
  const arr = [...source];
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];// shift bigger items right
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
console.log(insertionSort(input));// [ 11, 12, 22, 25, 34, 64, 90 ]

console.log("<<<< Merge sort: split in half, sort each half, merge >>>>");
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const merged = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) merged.push(left[i] <= right[j] ? left[i++] : right[j++]);
  return [...merged, ...left.slice(i), ...right.slice(j)];
}
console.log(mergeSort(input));// [ 11, 12, 22, 25, 34, 64, 90 ]

console.log("<<<< Quick sort: pick a pivot, smaller to the left, bigger to the right >>>>");
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const [pivot, ...rest] = arr;
  const smaller = rest.filter((x) => x < pivot);
  const bigger = rest.filter((x) => x >= pivot);
  return [...quickSort(smaller), pivot, ...quickSort(bigger)];
}
console.log(quickSort(input));// [ 11, 12, 22, 25, 34, 64, 90 ]

console.log("<<<< Built-in sort gotchas >>>>");
console.log([10, 9, 1, 100].sort());// [ 1, 10, 100, 9 ]   (compares as strings by default)
console.log([10, 9, 1, 100].sort((a, b) => a - b));// [ 1, 9, 10, 100 ]
const original = [3, 1, 2];
const copy = original.toSorted();// ES2023: returns a new array
console.log(original, copy);// [ 3, 1, 2 ] [ 1, 2, 3 ]   (sort() would have changed original)
