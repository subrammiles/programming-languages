package ch25_interview_questions.c_array_programs;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

/*
Array programs asked in Java interviews.
Patterns to recognise: hash map lookup, two pointers, sliding window, running max/min.
*/
public class ArrayPrograms {

    // 1. Largest and second largest in one pass
    static int[] topTwo(int[] arr) {
        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int n : arr) {
            if (n > first) {
                second = first;
                first = n;
            } else if (n > second && n != first) {
                second = n;
            }
        }
        return new int[] {first, second};
    }

    // 2. Find duplicates
    static Set<Integer> duplicates(int[] arr) {
        Set<Integer> seen = new HashSet<>(), dups = new LinkedHashSet<>();
        for (int n : arr) if (!seen.add(n)) dups.add(n);
        return dups;
    }

    // 3. Missing number in 1..n (sum formula; XOR also works and cannot overflow)
    static int missingNumber(int[] arr) {
        int n = arr.length + 1;
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int x : arr) actual += x;
        return expected - actual;
    }

    // 4. Two sum: indices of the two numbers that add up to target, O(n)
    static int[] twoSum(int[] arr, int target) {
        Map<Integer, Integer> seen = new HashMap<>();     // value -> index
        for (int i = 0; i < arr.length; i++) {
            Integer j = seen.get(target - arr[i]);
            if (j != null) return new int[] {j, i};
            seen.put(arr[i], i);
        }
        return new int[0];
    }

    // 5. Reverse an array in place
    static void reverse(int[] arr) {
        for (int i = 0, j = arr.length - 1; i < j; i++, j--) {
            int t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
    }

    // 6. Rotate right by k, in place, with three reversals
    static void rotate(int[] arr, int k) {
        k %= arr.length;
        reverseRange(arr, 0, arr.length - 1);
        reverseRange(arr, 0, k - 1);
        reverseRange(arr, k, arr.length - 1);
    }
    private static void reverseRange(int[] a, int i, int j) {
        for (; i < j; i++, j--) { int t = a[i]; a[i] = a[j]; a[j] = t; }
    }

    // 7. Move zeros to the end, keeping order
    static void moveZeros(int[] arr) {
        int write = 0;
        for (int n : arr) if (n != 0) arr[write++] = n;
        while (write < arr.length) arr[write++] = 0;
    }

    // 8. Merge two sorted arrays
    static int[] mergeSorted(int[] a, int[] b) {
        int[] out = new int[a.length + b.length];
        int i = 0, j = 0, k = 0;
        while (i < a.length && j < b.length) out[k++] = a[i] <= b[j] ? a[i++] : b[j++];
        while (i < a.length) out[k++] = a[i++];
        while (j < b.length) out[k++] = b[j++];
        return out;
    }

    // 9. Maximum subarray sum (Kadane's algorithm)
    static int maxSubarraySum(int[] arr) {
        int best = arr[0], current = arr[0];
        for (int i = 1; i < arr.length; i++) {
            current = Math.max(arr[i], current + arr[i]);
            best = Math.max(best, current);
        }
        return best;
    }

    // 10. Best time to buy and sell a stock (one transaction)
    static int maxProfit(int[] prices) {
        int min = Integer.MAX_VALUE, profit = 0;
        for (int p : prices) {
            min = Math.min(min, p);
            profit = Math.max(profit, p - min);
        }
        return profit;
    }

    // 11. Remove duplicates from a SORTED array in place; return the new length
    static int dedupeSorted(int[] arr) {
        if (arr.length == 0) return 0;
        int write = 1;
        for (int i = 1; i < arr.length; i++) if (arr[i] != arr[write - 1]) arr[write++] = arr[i];
        return write;
    }

    // 12. Intersection of two arrays
    static Set<Integer> intersection(int[] a, int[] b) {
        Set<Integer> setA = new HashSet<>();
        for (int x : a) setA.add(x);
        Set<Integer> result = new LinkedHashSet<>();
        for (int x : b) if (setA.contains(x)) result.add(x);
        return result;
    }

    // 13. Element that appears more than n/2 times (Boyer-Moore majority vote)
    static int majority(int[] arr) {
        int candidate = 0, count = 0;
        for (int n : arr) {
            if (count == 0) candidate = n;
            count += (n == candidate) ? 1 : -1;
        }
        return candidate;
    }

    // 14. Matrix transpose and rotate 90 degrees clockwise
    static int[][] rotate90(int[][] m) {
        int n = m.length;
        int[][] r = new int[n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                r[j][n - 1 - i] = m[i][j];
        return r;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(topTwo(new int[] {12, 35, 1, 10, 34, 35})));   // [35, 34]
        System.out.println(duplicates(new int[] {4, 2, 7, 2, 4, 4}));                   // [2, 4]
        System.out.println(missingNumber(new int[] {1, 2, 4, 5, 6}));                    // 3
        System.out.println(Arrays.toString(twoSum(new int[] {2, 7, 11, 15}, 9)));        // [0, 1]

        int[] arr = {1, 2, 3, 4, 5};
        reverse(arr);
        System.out.println(Arrays.toString(arr));                                        // [5, 4, 3, 2, 1]
        arr = new int[] {1, 2, 3, 4, 5};
        rotate(arr, 2);
        System.out.println(Arrays.toString(arr));                                        // [4, 5, 1, 2, 3]

        int[] zeros = {0, 1, 0, 3, 12};
        moveZeros(zeros);
        System.out.println(Arrays.toString(zeros));                                      // [1, 3, 12, 0, 0]

        System.out.println(Arrays.toString(mergeSorted(new int[] {1, 4, 7}, new int[] {2, 3, 8})));   // [1, 2, 3, 4, 7, 8]
        System.out.println(maxSubarraySum(new int[] {-2, 1, -3, 4, -1, 2, 1, -5, 4}));  // 6
        System.out.println(maxProfit(new int[] {7, 1, 5, 3, 6, 4}));                     // 5

        int[] sorted = {1, 1, 2, 3, 3, 3, 4};
        int len = dedupeSorted(sorted);
        System.out.println(Arrays.toString(Arrays.copyOf(sorted, len)));                 // [1, 2, 3, 4]

        System.out.println(intersection(new int[] {1, 2, 2, 3}, new int[] {2, 3, 5}));   // [2, 3]
        System.out.println(majority(new int[] {2, 2, 1, 1, 2, 2, 3}));                    // 2
        System.out.println(Arrays.deepToString(rotate90(new int[][] {{1, 2}, {3, 4}}))); // [[3, 1], [4, 2]]
    }
}
