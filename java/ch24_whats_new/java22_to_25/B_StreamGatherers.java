package ch24_whats_new.java22_to_25;

import java.util.List;
import java.util.stream.Gatherers;
import java.util.stream.Stream;

/*
Stream gatherers (Java 24)
stream.gather(...) adds custom intermediate operations, the way collect(...) allows custom terminal ones.
Built-in gatherers:
 windowFixed(n)      -> [1,2,3,4,5] -> [[1,2],[3,4],[5]]
 windowSliding(n)    -> [1,2,3,4]   -> [[1,2],[2,3],[3,4]]
 fold(init, fn)      -> one running result at the end
 scan(init, fn)      -> every running result (running total)
 mapConcurrent(n,fn) -> map using up to n virtual threads at a time
Requires JDK 24+.
*/
public class B_StreamGatherers {

    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5);

        System.out.println(nums.stream().gather(Gatherers.windowFixed(2)).toList());
        // [[1, 2], [3, 4], [5]]

        System.out.println(nums.stream().gather(Gatherers.windowSliding(3)).toList());
        // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]

        System.out.println(nums.stream().gather(Gatherers.scan(() -> 0, Integer::sum)).toList());
        // [1, 3, 6, 10, 15]  running total

        System.out.println(nums.stream().gather(Gatherers.fold(() -> "", (acc, n) -> acc + n)).toList());
        // [12345]

        // Moving average of daily prices over 3 days
        List<Double> prices = List.of(100.0, 102.0, 101.0, 105.0, 110.0);
        System.out.println(prices.stream()
                .gather(Gatherers.windowSliding(3))
                .map(w -> w.stream().mapToDouble(Double::doubleValue).average().orElse(0))
                .map(avg -> Math.round(avg * 100) / 100.0)
                .toList());
        // [101.0, 102.67, 105.33]

        // mapConcurrent: e.g. call a slow service for each item, at most 3 at a time
        long start = System.currentTimeMillis();
        List<String> results = Stream.of("a", "b", "c", "d", "e", "f")
                .gather(Gatherers.mapConcurrent(3, s -> {
                    try { Thread.sleep(200); } catch (InterruptedException e) { throw new RuntimeException(e); }
                    return s.toUpperCase();
                }))
                .toList();
        System.out.println(results + " in ~" + (System.currentTimeMillis() - start) + " ms"); // ~400 ms, order kept
    }
}
