package ch18_concurrency.o_producer_consumer;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

/*
Producer-consumer with a BlockingQueue (the way to do it in real code)
  put(x)   -> waits while the queue is full
  take()   -> waits while the queue is empty
  offer / poll with a timeout -> wait at most that long
All the locking and waiting from A_WaitNotify is done for you.

To stop consumers cleanly, producers send a special "poison pill" value.
*/
public class B_BlockingQueue {

    private static final int POISON_PILL = -1;

    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(3);
        AtomicInteger processed = new AtomicInteger();
        AtomicInteger total = new AtomicInteger();
        int consumers = 2;

        try (ExecutorService pool = Executors.newFixedThreadPool(3)) {
            pool.submit(() -> {                                   // producer
                for (int i = 1; i <= 10; i++) queue.put(i);
                for (int i = 0; i < consumers; i++) queue.put(POISON_PILL);   // one pill per consumer
                return null;
            });

            for (int c = 1; c <= consumers; c++) {
                int id = c;
                pool.submit(() -> {                               // consumers
                    while (true) {
                        int item = queue.take();
                        if (item == POISON_PILL) break;
                        processed.incrementAndGet();
                        total.addAndGet(item);
                        Thread.sleep(5);                          // simulate work
                    }
                    System.out.println("consumer " + id + " stopped");
                    return null;
                });
            }
        }   // try-with-resources on ExecutorService (Java 19+) waits for all tasks to finish

        // consumer 1 stopped   } in either order
        // consumer 2 stopped   }
        System.out.println("processed " + processed + " items, total " + total);   // processed 10 items, total 55

        // Timed operations
        BlockingQueue<String> small = new ArrayBlockingQueue<>(1);
        System.out.println(small.offer("a"));                                 // true
        System.out.println(small.offer("b", 50, TimeUnit.MILLISECONDS));      // false   (full; gave up after 50ms)
        System.out.println(small.poll() + " " + small.poll(50, TimeUnit.MILLISECONDS));   // a null
    }
}
