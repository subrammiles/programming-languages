package ch05_arrays;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

/*
java.util.Arrays - static helper methods for arrays
  toString / deepToString   print arrays (println(array) only prints [I@1b6d3586)
  sort / parallelSort       sort (primitives: dual-pivot quicksort; objects: stable TimSort)
  binarySearch              O(log n) search - the array MUST be sorted first
  fill / setAll             fill with a value / compute each element
  copyOf / copyOfRange      copy and resize
  equals / deepEquals       compare contents (== compares references)
  asList / stream           bridge to collections and streams
*/
public class D_ArraysUtilityClass {

    public static void main(String[] args) {
        int[] numbers = {5, 3, 9, 1, 7};

        System.out.println(numbers.toString().startsWith("[I@"));    // true   (useless default)
        System.out.println(Arrays.toString(numbers));                // [5, 3, 9, 1, 7]

        int[][] grid = {{1, 2}, {3, 4}};
        System.out.println(Arrays.deepToString(grid));               // [[1, 2], [3, 4]]

        // sort and binary search
        Arrays.sort(numbers);
        System.out.println(Arrays.toString(numbers));                // [1, 3, 5, 7, 9]
        System.out.println(Arrays.binarySearch(numbers, 7));         // 3
        System.out.println(Arrays.binarySearch(numbers, 4));         // -3   (not found: -(insertion point) - 1)

        // sort objects with a Comparator (primitive arrays cannot take one)
        String[] words = {"banana", "Apple", "cherry", "fig"};
        Arrays.sort(words);
        System.out.println(Arrays.toString(words));                  // [Apple, banana, cherry, fig]
        Arrays.sort(words, String.CASE_INSENSITIVE_ORDER.reversed());
        System.out.println(Arrays.toString(words));                  // [fig, cherry, banana, Apple]
        Arrays.sort(words, Comparator.comparing(String::length).thenComparing(Comparator.naturalOrder()));
        System.out.println(Arrays.toString(words));                  // [fig, Apple, banana, cherry]

        Integer[] boxed = {3, 1, 2};
        Arrays.sort(boxed, Comparator.reverseOrder());               // descending needs Integer[], not int[]
        System.out.println(Arrays.toString(boxed));                  // [3, 2, 1]

        // fill, setAll, copy
        int[] zeros = new int[4];
        Arrays.fill(zeros, 7);
        System.out.println(Arrays.toString(zeros));                  // [7, 7, 7, 7]
        int[] squares = new int[5];
        Arrays.setAll(squares, i -> i * i);
        System.out.println(Arrays.toString(squares));                // [0, 1, 4, 9, 16]
        System.out.println(Arrays.toString(Arrays.copyOf(squares, 7)));        // [0, 1, 4, 9, 16, 0, 0]
        System.out.println(Arrays.toString(Arrays.copyOfRange(squares, 1, 3))); // [1, 4]

        // equality
        int[] a = {1, 2}, b = {1, 2};
        System.out.println((a == b) + " " + a.equals(b) + " " + Arrays.equals(a, b));   // false false true
        System.out.println(Arrays.deepEquals(new int[][] {{1}}, new int[][] {{1}}));    // true

        // to collections and streams
        List<String> fixed = Arrays.asList("x", "y");                // fixed-size, backed by the array
        fixed.set(0, "changed");                                     // allowed
        try {
            fixed.add("z");                                          // not allowed: size is fixed
        } catch (UnsupportedOperationException e) {
            System.out.println("asList is fixed-size");              // asList is fixed-size
        }
        System.out.println(Arrays.stream(new int[] {4, 8, 15}).sum());           // 27
        System.out.println(Arrays.stream(new int[] {4, 8, 15}).max().getAsInt()); // 15

        // mismatch (Java 9): first index where two arrays differ
        System.out.println(Arrays.mismatch(new int[] {1, 2, 3}, new int[] {1, 9, 3}));   // 1
    }
}
