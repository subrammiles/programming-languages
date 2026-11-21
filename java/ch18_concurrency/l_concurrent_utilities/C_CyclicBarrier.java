package ch18_concurrency.l_concurrent_utilities;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/*
CyclicBarrier
N threads each call await(); everyone blocks until ALL N have arrived, then all continue.
An optional "barrier action" runs once each time the barrier trips.
"Cyclic": it resets automatically, so it can be reused for the next round.

CountDownLatch vs CyclicBarrier:
  CountDownLatch -> one-time; some threads count down, OTHER threads wait
  CyclicBarrier  -> reusable; the SAME threads wait for each other
*/
public class C_CyclicBarrier {

    public static void main(String[] args) {
        int workers = 3;
        int[] round = {1};
        CyclicBarrier barrier = new CyclicBarrier(workers,
                () -> System.out.println("--- all " + workers + " workers finished round " + round[0]++ + " ---"));

        try (ExecutorService pool = Executors.newFixedThreadPool(workers)) {
            for (int w = 1; w <= workers; w++) {
                int id = w;
                pool.submit(() -> {
                    for (int r = 1; r <= 2; r++) {
                        Thread.sleep(id * 10L);               // workers take different amounts of time
                        System.out.println("worker " + id + " done with round " + r);
                        try {
                            barrier.await();                  // wait for the others
                        } catch (BrokenBarrierException e) {
                            return null;
                        }
                    }
                    return null;
                });
            }
        }
        // worker 1 done with round 1
        // worker 2 done with round 1
        // worker 3 done with round 1
        // --- all 3 workers finished round 1 ---
        // worker 1 done with round 2
        // worker 2 done with round 2
        // worker 3 done with round 2
        // --- all 3 workers finished round 2 ---
    }
}
