package ch18_concurrency.m_completable_future;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

/*
Running async work in parallel and combining results
 thenCombine(other, fn) -> both results, when both are done
 allOf(...)             -> wait for all            (like Promise.all)
 anyOf(...)             -> first one to finish    (like Promise.race)
 orTimeout / completeOnTimeout (Java 9)
*/
public class B_CombiningFutures {

    static CompletableFuture<Integer> price(String shop, int value, long delayMs) {
        return CompletableFuture.supplyAsync(() -> {
            sleep(delayMs);
            System.out.println("  " + shop + " answered after " + delayMs + "ms");
            return value;
        });
    }

    public static void main(String[] args) {
        long start = System.currentTimeMillis();

        // thenCombine
        int total = price("hotel", 5000, 300)
                .thenCombine(price("flight", 7000, 400), Integer::sum)
                .join();
        System.out.println("trip total = " + total); // 12000

        // allOf: ask 3 shops at once, total time ~ the slowest, not the sum
        List<CompletableFuture<Integer>> quotes = List.of(
                price("shopA", 120, 500), price("shopB", 99, 300), price("shopC", 110, 400));
        CompletableFuture.allOf(quotes.toArray(new CompletableFuture[0])).join();
        int best = quotes.stream().mapToInt(CompletableFuture::join).min().getAsInt();
        System.out.println("best price = " + best); // 99

        // anyOf: first to answer wins
        Object fastest = CompletableFuture.anyOf(price("mirror1", 1, 600), price("mirror2", 2, 100)).join();
        System.out.println("fastest mirror = " + fastest); // 2

        // timeouts
        int withDefault = price("slow", 1, 2000).completeOnTimeout(-1, 500, TimeUnit.MILLISECONDS).join();
        System.out.println("slow service -> " + withDefault); // -1

        System.out.println("elapsed ~" + (System.currentTimeMillis() - start) + " ms");
    }

    static void sleep(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
