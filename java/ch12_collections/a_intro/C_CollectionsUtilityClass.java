package ch12_collections.a_intro;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

/*
java.util.Collections - static helpers for collections (not to be confused with the Collection interface)
  sort, reverse, shuffle, swap, rotate     reorder a List in place
  max, min, frequency, binarySearch        query
  nCopies, emptyList, singletonList        create small lists
  unmodifiableList / synchronizedList      wrap an existing list
*/
public class C_CollectionsUtilityClass {

    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(5, 3, 9, 1, 3));

        Collections.sort(nums);
        System.out.println(nums);                                   // [1, 3, 3, 5, 9]
        Collections.sort(nums, Collections.reverseOrder());
        System.out.println(nums);                                   // [9, 5, 3, 3, 1]
        Collections.reverse(nums);
        System.out.println(nums);                                   // [1, 3, 3, 5, 9]

        System.out.println(Collections.max(nums) + " " + Collections.min(nums));   // 9 1
        System.out.println(Collections.frequency(nums, 3));         // 2
        System.out.println(Collections.binarySearch(nums, 5));      // 3   (list must be sorted)

        Collections.swap(nums, 0, 4);
        System.out.println(nums);                                   // [9, 3, 3, 5, 1]
        Collections.rotate(nums, 1);
        System.out.println(nums);                                   // [1, 9, 3, 3, 5]
        Collections.shuffle(nums, new Random(42));                  // a seed makes the order repeatable
        System.out.println(nums.size());                            // 5

        System.out.println(Collections.nCopies(3, "ab"));           // [ab, ab, ab]
        System.out.println(String.join("", Collections.nCopies(5, "-")));   // -----

        List<String> names = new ArrayList<>(List.of("bo", "ann"));
        Collections.addAll(names, "cy", "dee");
        System.out.println(names);                                  // [bo, ann, cy, dee]

        // unmodifiable VIEW: changes to the original still show through
        List<String> readOnly = Collections.unmodifiableList(names);
        names.add("eve");
        System.out.println(readOnly.size());                        // 5
        try {
            readOnly.add("x");
        } catch (UnsupportedOperationException e) {
            System.out.println("read-only view");                   // read-only view
        }
        // List.copyOf(names) instead gives an independent immutable COPY

        System.out.println(Collections.disjoint(List.of(1, 2), List.of(3, 4)));   // true
        System.out.println(Collections.emptyList().isEmpty());       // true
    }
}
