package ch18_concurrency.h_locks;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/*
ReadWriteLock
synchronized and ReentrantLock allow only ONE thread at a time, even if all threads only read.
A ReadWriteLock has two locks:
  readLock()  -> MANY threads can hold it together, as long as nobody holds the write lock
  writeLock() -> only ONE thread, and no readers at the same time
Good for data that is read often and changed rarely (caches, configuration).
Always unlock in a finally block.
*/
public class ReadWriteLockExample {

    static class Cache {
        private final Map<String, String> data = new HashMap<>();
        private final ReadWriteLock lock = new ReentrantReadWriteLock();
        private int maxConcurrentReaders = 0;
        private int currentReaders = 0;

        String get(String key) throws InterruptedException {
            lock.readLock().lock();
            try {
                synchronized (this) {
                    currentReaders++;
                    maxConcurrentReaders = Math.max(maxConcurrentReaders, currentReaders);
                }
                Thread.sleep(50);                 // a slow read
                return data.get(key);
            } finally {
                synchronized (this) { currentReaders--; }
                lock.readLock().unlock();
            }
        }

        void put(String key, String value) {
            lock.writeLock().lock();
            try {
                data.put(key, value);
            } finally {
                lock.writeLock().unlock();
            }
        }
    }

    public static void main(String[] args) {
        Cache cache = new Cache();
        cache.put("lang", "Java");

        long start = System.currentTimeMillis();
        try (ExecutorService pool = Executors.newFixedThreadPool(5)) {
            for (int i = 0; i < 5; i++) {
                pool.submit(() -> cache.get("lang"));
            }
        }
        long elapsed = System.currentTimeMillis() - start;

        System.out.println("readers at the same time: " + cache.maxConcurrentReaders);   // readers at the same time: 5
        System.out.println("5 slow reads took < 200ms: " + (elapsed < 200));            // 5 slow reads took < 200ms: true
        // With synchronized instead, the 5 reads would run one by one: about 250ms.
    }
}
