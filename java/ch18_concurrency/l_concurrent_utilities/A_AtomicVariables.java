package ch18_concurrency.l_concurrent_utilities;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.LongAdder;

/*
Atomic variables - thread-safe counters without synchronized
 AtomicInteger / AtomicLong: incrementAndGet, compareAndSet, updateAndGet ...
 LongAdder: even faster when many threads mostly add
count++ is NOT atomic: it is read, add, write. Two threads can lose updates.
*/
public class A_AtomicVariables {

    static int unsafeCount = 0;

    public static void main(String[] args) throws InterruptedException {
        AtomicInteger atomicCount = new AtomicInteger();
        LongAdder adder = new LongAdder();

        ExecutorService pool = Executors.newFixedThreadPool(8);
        for (int i = 0; i < 100_000; i++) {
            pool.submit(() -> {
                unsafeCount++;
                atomicCount.incrementAndGet();
                adder.increment();
            });
        }
        pool.shutdown();
        pool.awaitTermination(10, TimeUnit.SECONDS);

        System.out.println("unsafe: " + unsafeCount);       // usually LESS than 100000
        System.out.println("atomic: " + atomicCount.get()); // 100000
        System.out.println("adder:  " + adder.sum());       // 100000

        // compareAndSet: change only if the value is what we expect
        AtomicInteger seats = new AtomicInteger(1);
        System.out.println(seats.compareAndSet(1, 0)); // true  -> booked
        System.out.println(seats.compareAndSet(1, 0)); // false -> someone already booked it

        System.out.println(atomicCount.updateAndGet(x -> x * 2)); // 200000
    }
}
