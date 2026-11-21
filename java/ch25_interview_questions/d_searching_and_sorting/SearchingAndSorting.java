package ch25_interview_questions.d_searching_and_sorting;

import java.util.Arrays;

/*
Searching and sorting algorithms, written by hand.
In real code use Arrays.sort / Collections.sort and Arrays.binarySearch.

  Algorithm        Best        Average     Worst       Extra memory   Stable
  Bubble sort      O(n)        O(n^2)      O(n^2)      O(1)           yes
  Selection sort   O(n^2)      O(n^2)      O(n^2)      O(1)           no
  Insertion sort   O(n)        O(n^2)      O(n^2)      O(1)           yes
  Merge sort       O(n log n)  O(n log n)  O(n log n)  O(n)           yes
  Quick sort       O(n log n)  O(n log n)  O(n^2)      O(log n)       no
  Counting sort    O(n + k)    O(n + k)    O(n + k)    O(k)           yes (small integer ranges)
*/
public class SearchingAndSorting {

    static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;          // avoids int overflow of (low + high)
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    static int binarySearchRecursive(int[] arr, int target, int low, int high) {
        if (low > high) return -1;
        int mid = (low + high) >>> 1;
        if (arr[mid] == target) return mid;
        return arr[mid] < target ? binarySearchRecursive(arr, target, mid + 1, high)
                                 : binarySearchRecursive(arr, target, low, mid - 1);
    }

    static void bubbleSort(int[] a) {
        for (int end = a.length - 1; end > 0; end--) {
            boolean swapped = false;
            for (int i = 0; i < end; i++) {
                if (a[i] > a[i + 1]) {
                    swap(a, i, i + 1);
                    swapped = true;
                }
            }
            if (!swapped) break;                       // already sorted
        }
    }

    static void selectionSort(int[] a) {
        for (int i = 0; i < a.length - 1; i++) {
            int min = i;
            for (int j = i + 1; j < a.length; j++) if (a[j] < a[min]) min = j;
            swap(a, i, min);
        }
    }

    static void insertionSort(int[] a) {
        for (int i = 1; i < a.length; i++) {
            int key = a[i], j = i - 1;
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
        }
    }

    static void mergeSort(int[] a) {
        if (a.length < 2) return;
        int mid = a.length / 2;
        int[] left = Arrays.copyOfRange(a, 0, mid);
        int[] right = Arrays.copyOfRange(a, mid, a.length);
        mergeSort(left);
        mergeSort(right);
        int i = 0, j = 0, k = 0;
        while (i < left.length && j < right.length) a[k++] = left[i] <= right[j] ? left[i++] : right[j++];
        while (i < left.length) a[k++] = left[i++];
        while (j < right.length) a[k++] = right[j++];
    }

    static void quickSort(int[] a, int low, int high) {
        if (low >= high) return;
        int p = partition(a, low, high);
        quickSort(a, low, p - 1);
        quickSort(a, p + 1, high);
    }

    // Lomuto partition: pivot = last element; smaller elements move to its left
    private static int partition(int[] a, int low, int high) {
        int pivot = a[high], i = low;
        for (int j = low; j < high; j++) if (a[j] < pivot) swap(a, i++, j);
        swap(a, i, high);
        return i;
    }

    static void countingSort(int[] a, int maxValue) {
        int[] counts = new int[maxValue + 1];
        for (int x : a) counts[x]++;
        int k = 0;
        for (int v = 0; v <= maxValue; v++) while (counts[v]-- > 0) a[k++] = v;
    }

    private static void swap(int[] a, int i, int j) {
        int t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    public static void main(String[] args) {
        int[] sorted = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        System.out.println(binarySearch(sorted, 23) + " " + binarySearch(sorted, 7));   // 5 -1
        System.out.println(binarySearchRecursive(sorted, 91, 0, sorted.length - 1));    // 9

        int[] input = {64, 34, 25, 12, 22, 11, 90};

        int[] a = input.clone(); bubbleSort(a);    System.out.println("bubble    " + Arrays.toString(a));
        a = input.clone();       selectionSort(a); System.out.println("selection " + Arrays.toString(a));
        a = input.clone();       insertionSort(a); System.out.println("insertion " + Arrays.toString(a));
        a = input.clone();       mergeSort(a);     System.out.println("merge     " + Arrays.toString(a));
        a = input.clone();       quickSort(a, 0, a.length - 1); System.out.println("quick     " + Arrays.toString(a));
        a = input.clone();       countingSort(a, 100); System.out.println("counting  " + Arrays.toString(a));
        // each line: [11, 12, 22, 25, 34, 64, 90]
    }
}
