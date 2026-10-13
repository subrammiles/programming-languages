package ch18_concurrency.n_virtual_threads;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.IntStream;

/*
Comparing a fixed pool of platform threads with virtual threads
for the same I/O-style workload (each task sleeps 100 ms).
*/
public class B_VirtualVsPlatform {

    static long run(ExecutorService executor, int tasks) {
        long start = System.currentTimeMillis();
        try (executor) {
            IntStream.range(0, tasks).forEach(i -> executor.submit(() -> {
                Thread.sleep(100);
                return i;
            }));
        }
        return System.currentTimeMillis() - start;
    }

    public static void main(String[] args) {
        int tasks = 2_000;
        System.out.println("platform pool of 50: " + run(Executors.newFixedThreadPool(50), tasks) + " ms"); // ~4000 ms
        System.out.println("virtual threads:     " + run(Executors.newVirtualThreadPerTaskExecutor(), tasks) + " ms"); // ~100-200 ms

        /*
        Tips
         1. Don't pool virtual threads; create one per task.
         2. Use a Semaphore (not a small pool) to limit access to a scarce resource like a DB.
         3. ThreadLocal works but each of millions of threads gets its own copy; prefer passing values,
            or ScopedValue (final in Java 25, see ch24_whats_new).
        */
    }
}
