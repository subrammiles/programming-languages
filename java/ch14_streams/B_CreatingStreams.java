package ch14_streams;

import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

/*
Ways to create a stream
A stream is a pipeline: source -> intermediate operations -> ONE terminal operation.
Streams are lazy (nothing runs until the terminal operation) and can be used only once.
*/
public class B_CreatingStreams {

    public static void main(String[] args) {
        Stream<String> fromList = List.of("a", "b", "c").stream();
        Stream<String> fromArray = Arrays.stream(new String[]{"x", "y"});
        Stream<Integer> fromValues = Stream.of(1, 2, 3);
        IntStream range = IntStream.rangeClosed(1, 5);              // 1..5
        Stream<Integer> iterate = Stream.iterate(1, n -> n <= 100, n -> n * 3); // Java 9 version with a stop condition
        Stream<Double> generate = Stream.generate(Math::random).limit(2);
        IntStream chars = "hello".chars();

        System.out.println(fromList.toList());   // [a, b, c]
        System.out.println(fromArray.count());   // 2
        System.out.println(fromValues.toList()); // [1, 2, 3]
        System.out.println(range.sum());         // 15
        System.out.println(iterate.toList());    // [1, 3, 9, 27, 81]
        System.out.println(generate.count());    // 2
        System.out.println(chars.count());       // 5

        // A stream can only be consumed once
        Stream<String> once = Stream.of("x");
        once.forEach(System.out::println);
        try {
            once.forEach(System.out::println);
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage()); // stream has already been operated upon or closed
        }

        // Lazy: peek only prints for elements actually pulled through the pipeline
        Stream.of(1, 2, 3, 4, 5)
                .peek(n -> System.out.println("looking at " + n))
                .filter(n -> n > 2)
                .findFirst()
                .ifPresent(n -> System.out.println("found " + n));
        // looking at 1, looking at 2, looking at 3, found 3   (4 and 5 never touched)
    }
}
