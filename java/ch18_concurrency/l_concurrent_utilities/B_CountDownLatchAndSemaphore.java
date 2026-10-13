package ch18_concurrency.l_concurrent_utilities;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;

/*
Coordination tools in java.util.concurrent
 CountDownLatch -> wait until N things have happened (one-shot)
 Semaphore      -> allow at most N threads into a section at the same time
 (Also: CyclicBarrier, Phaser, Exchanger)
*/
public class B_CountDownLatchAndSemaphore {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("<<<< CountDownLatch: wait for 3 services to start >>>>");
        CountDownLatch ready = new CountDownLatch(3);
        try (ExecutorService pool = Executors.newFixedThreadPool(3)) {
            for (String service : new String[]{"database", "cache", "queue"}) {
                pool.submit(() -> {
                    sleep((long) (Math.random() * 300));
                    System.out.println(service + " started");
                    ready.countDown();
                });
            }
            ready.await(); // blocks until the count reaches 0
            System.out.println("all services up, accepting requests");
        }

        System.out.println("<<<< Semaphore: only 2 downloads at a time >>>>");
        Semaphore slots = new Semaphore(2);
        try (ExecutorService pool = Executors.newFixedThreadPool(5)) {
            for (int i = 1; i <= 5; i++) {
                int id = i;
                pool.submit(() -> {
                    try {
                        slots.acquire();
                        System.out.println("download " + id + " started (free slots: " + slots.availablePermits() + ")");
                        sleep(200);
                        System.out.println("download " + id + " finished");
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    } finally {
                        slots.release();
                    }
                });
            }
        } // ExecutorService is AutoCloseable since Java 19: close() waits for the tasks
    }

    static void sleep(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
