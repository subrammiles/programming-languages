package ch22_design_patterns.singleton;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/*
Singleton step by step: why the naive lazy version breaks under threads, and the fixes.
Every version has a PRIVATE constructor, so `new` cannot be called from outside.

 1. Eager       - created when the class loads. Simple and thread-safe, but not lazy.
 2. Lazy        - created on first use. NOT thread-safe: two threads can both see null.
 3. Synchronized- thread-safe, but every call pays for the lock.
 4. Double-checked locking - lock only while creating. The field MUST be volatile,
                  otherwise another thread may see a half-constructed object.
See EnumSingleton.java for the enum and holder-class versions (the recommended ones).
*/
public class SingletonExample {

    static final class Eager {
        private static final Eager INSTANCE = new Eager();
        private Eager() {}
        static Eager getInstance() { return INSTANCE; }
    }

    static final class LazyUnsafe {
        static final Set<Integer> createdIds = ConcurrentHashMap.newKeySet();
        private static LazyUnsafe instance;
        private LazyUnsafe() {
            createdIds.add(System.identityHashCode(this));
            try { Thread.sleep(5); } catch (InterruptedException ignored) { }   // widen the race window
        }
        static LazyUnsafe getInstance() {
            if (instance == null) instance = new LazyUnsafe();   // check-then-act race!
            return instance;
        }
    }

    static final class LazySynchronized {
        private static LazySynchronized instance;
        private LazySynchronized() {}
        static synchronized LazySynchronized getInstance() {
            if (instance == null) instance = new LazySynchronized();
            return instance;
        }
    }

    static final class DoubleChecked {
        static final Set<Integer> createdIds = ConcurrentHashMap.newKeySet();
        private static volatile DoubleChecked instance;
        private DoubleChecked() {
            createdIds.add(System.identityHashCode(this));
            try { Thread.sleep(5); } catch (InterruptedException ignored) { }
        }
        static DoubleChecked getInstance() {
            DoubleChecked local = instance;            // one volatile read on the fast path
            if (local == null) {                       // 1st check, without the lock
                synchronized (DoubleChecked.class) {
                    local = instance;
                    if (local == null) {               // 2nd check, with the lock
                        instance = local = new DoubleChecked();
                    }
                }
            }
            return local;
        }
    }

    // Start many threads at the same moment, all calling getInstance()
    static void race(Runnable call) throws InterruptedException {
        CountDownLatch startSignal = new CountDownLatch(1);
        try (ExecutorService pool = Executors.newFixedThreadPool(8)) {
            for (int i = 0; i < 8; i++) {
                pool.submit(() -> {
                    startSignal.await();
                    call.run();
                    return null;
                });
            }
            startSignal.countDown();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println(Eager.getInstance() == Eager.getInstance());                     // true
        System.out.println(LazySynchronized.getInstance() == LazySynchronized.getInstance()); // true

        race(LazyUnsafe::getInstance);
        System.out.println("LazyUnsafe instances created: " + LazyUnsafe.createdIds.size());
        // LazyUnsafe instances created: 8   (usually more than 1: the singleton is broken)

        race(DoubleChecked::getInstance);
        System.out.println("DoubleChecked instances created: " + DoubleChecked.createdIds.size());
        // DoubleChecked instances created: 1
    }
}
