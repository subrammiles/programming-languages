package ch14_streams;

import java.util.List;
import java.util.Optional;

/*
Terminal operations end the pipeline and produce a result:
 forEach, toList, collect, reduce, count, min, max,
 findFirst, findAny, anyMatch, allMatch, noneMatch, toArray
*/
public class D_TerminalOperations {

    public static void main(String[] args) {
        List<Integer> nums = List.of(4, 7, 1, 9, 3);

        System.out.println(nums.stream().count());                          // 5
        System.out.println(nums.stream().min(Integer::compare).get());      // 1
        System.out.println(nums.stream().max(Integer::compare).get());      // 9
        System.out.println(nums.stream().reduce(0, Integer::sum));          // 24
        System.out.println(nums.stream().reduce(1, (a, b) -> a * b));       // 756

        Optional<Integer> firstBig = nums.stream().filter(n -> n > 5).findFirst();
        System.out.println(firstBig.orElse(-1));                            // 7

        System.out.println(nums.stream().anyMatch(n -> n > 8));   // true
        System.out.println(nums.stream().allMatch(n -> n > 0));   // true
        System.out.println(nums.stream().noneMatch(n -> n > 100)); // true

        Integer[] arr = nums.stream().sorted().toArray(Integer[]::new);
        System.out.println(java.util.Arrays.toString(arr));       // [1, 3, 4, 7, 9]

        // toList() (Java 16) returns an UNMODIFIABLE list
        List<Integer> list = nums.stream().toList();
        try {
            list.add(1);
        } catch (UnsupportedOperationException e) {
            System.out.println("toList() is unmodifiable; use collect(Collectors.toList()) or new ArrayList<>(...)");
        }
    }
}
