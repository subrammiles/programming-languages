package ch14_streams;

import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.LongStream;

/*
1. Primitive streams: IntStream, LongStream, DoubleStream
   - avoid boxing (faster), and have sum(), average(), summaryStatistics()
   - mapToInt / mapToObj / boxed() convert between them
2. Parallel streams: .parallel() splits work across CPU cores.
   Only worth it for big, CPU-heavy work with no shared mutable state.
*/
public class F_PrimitiveAndParallelStreams {

    public static void main(String[] args) {
        List<String> words = List.of("java", "stream", "api");
        int totalLetters = words.stream().mapToInt(String::length).sum();
        System.out.println(totalLetters); // 13

        System.out.println(IntStream.of(4, 8, 6).average().getAsDouble()); // 6.0
        System.out.println(IntStream.rangeClosed(1, 5).boxed().toList());   // [1, 2, 3, 4, 5]
        System.out.println(IntStream.rangeClosed(1, 3).mapToObj(i -> "#" + i).toList()); // [#1, #2, #3]

        var stats = IntStream.of(3, 9, 1).summaryStatistics();
        System.out.println(stats); // IntSummaryStatistics{count=3, sum=13, min=1, average=4.333333, max=9}

        long n = 50_000_000;
        long t1 = System.currentTimeMillis();
        long seq = LongStream.rangeClosed(1, n).map(x -> x % 7).sum();
        long t2 = System.currentTimeMillis();
        long par = LongStream.rangeClosed(1, n).parallel().map(x -> x % 7).sum();
        long t3 = System.currentTimeMillis();
        System.out.println("same result: " + (seq == par));
        System.out.println("sequential " + (t2 - t1) + " ms, parallel " + (t3 - t2) + " ms");

        // Danger: shared mutable state in a parallel stream gives wrong answers
        int[] counter = {0};
        IntStream.range(0, 100_000).parallel().forEach(i -> counter[0]++);
        System.out.println("unsafe counter (should be 100000): " + counter[0]);
        System.out.println("safe count: " + IntStream.range(0, 100_000).parallel().count());
    }
}
