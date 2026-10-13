package ch14_streams;

import java.util.List;
import java.util.stream.Stream;

/*
Intermediate operations return a new stream:
 filter, map, flatMap, distinct, sorted, limit, skip, peek,
 takeWhile, dropWhile (Java 9), mapMulti (Java 16)
*/
public class C_IntermediateOperations {

    public static void main(String[] args) {
        List<Integer> nums = List.of(5, 3, 8, 3, 1, 9, 2);

        System.out.println(nums.stream().filter(n -> n > 3).toList());       // [5, 8, 9]
        System.out.println(nums.stream().map(n -> n * n).toList());          // [25, 9, 64, 9, 1, 81, 4]
        System.out.println(nums.stream().distinct().sorted().toList());      // [1, 2, 3, 5, 8, 9]
        System.out.println(nums.stream().sorted((a, b) -> b - a).limit(3).toList()); // [9, 8, 5]
        System.out.println(nums.stream().skip(5).toList());                  // [9, 2]

        // flatMap: each element becomes 0..n elements
        List<List<String>> nested = List.of(List.of("a", "b"), List.of("c"), List.of());
        System.out.println(nested.stream().flatMap(List::stream).toList());  // [a, b, c]

        List<String> sentences = List.of("java is fun", "streams are lazy");
        System.out.println(sentences.stream().flatMap(s -> Stream.of(s.split(" "))).toList());
        // [java, is, fun, streams, are, lazy]

        // takeWhile / dropWhile: stop or start at the first element that fails the test
        List<Integer> sortedNums = List.of(1, 2, 3, 10, 4, 5);
        System.out.println(sortedNums.stream().takeWhile(n -> n < 5).toList()); // [1, 2, 3]
        System.out.println(sortedNums.stream().dropWhile(n -> n < 5).toList()); // [10, 4, 5]

        // mapMulti: like flatMap, but push values to a consumer
        System.out.println(Stream.of(1, 2, 3).<Integer>mapMulti((n, out) -> {
            out.accept(n);
            out.accept(-n);
        }).toList()); // [1, -1, 2, -2, 3, -3]
    }
}
