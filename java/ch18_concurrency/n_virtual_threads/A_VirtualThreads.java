package ch18_concurrency.n_virtual_threads;

import java.time.Duration;
import java.util.concurrent.Executors;
import java.util.stream.IntStream;

/*
Virtual threads (Java 21)
Lightweight threads managed by the JVM, not the operating system.
 - You can create MILLIONS of them (platform threads: a few thousand at most).
 - When a virtual thread blocks (sleep, I/O, waiting for a DB), it frees its carrier thread.
 - Write simple blocking code; get the scalability of async code.
Best for I/O-heavy work (web servers, calling APIs). No benefit for CPU-heavy work.
Create them with:
  Thread.ofVirtual().start(task)
  Thread.startVirtualThread(task)
  Executors.newVirtualThreadPerTaskExecutor()
*/
public class A_VirtualThreads {

    public static void main(String[] args) throws InterruptedException {
        Thread vt = Thread.ofVirtual().name("my-virtual").start(() ->
                System.out.println("hello from " + Thread.currentThread()));
        vt.join();
        System.out.println("isVirtual = " + vt.isVirtual()); // true

        // 10,000 tasks that each "wait for I/O" for 1 second
        long start = System.currentTimeMillis();
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, 10_000).forEach(i -> executor.submit(() -> {
                Thread.sleep(Duration.ofSeconds(1)); // blocking is cheap on a virtual thread
                return i;
            }));
        } // close() waits for all tasks
        System.out.println("10,000 blocking tasks took " + (System.currentTimeMillis() - start) + " ms");
        // ~1000-1500 ms. With a pool of 100 platform threads it would take ~100 seconds.
    }
}
