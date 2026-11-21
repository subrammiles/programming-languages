package ch25_interview_questions.f_concurrency_programs;

import java.util.concurrent.Semaphore;

/*
"Print numbers 1..10 using two threads: one prints odd numbers, the other even numbers,
in the correct order."  Shown three ways:
  1. synchronized + wait/notifyAll on a shared counter
  2. two Semaphores that hand a "turn" back and forth
  3. (bonus) three threads printing A, B, C in a cycle with Semaphores
*/
public class OddEvenPrinter {

    // 1. wait / notifyAll
    static class Counter {
        private int current = 1;
        private final int max;
        Counter(int max) { this.max = max; }

        void print(boolean odd) {
            synchronized (this) {
                while (current <= max) {
                    if ((current % 2 == 1) == odd) {
                        System.out.print(Thread.currentThread().getName() + ":" + current + " ");
                        current++;
                        notifyAll();
                    } else {
                        try {
                            wait();
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                            return;
                        }
                    }
                }
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter(10);
        Thread odd = new Thread(() -> counter.print(true), "odd");
        Thread even = new Thread(() -> counter.print(false), "even");
        odd.start();
        even.start();
        odd.join();
        even.join();
        System.out.println();
        // odd:1 even:2 odd:3 even:4 odd:5 even:6 odd:7 even:8 odd:9 even:10

        // 2. Semaphores: odd starts with the only permit
        Semaphore oddTurn = new Semaphore(1), evenTurn = new Semaphore(0);
        Thread t1 = new Thread(() -> {
            for (int i = 1; i <= 9; i += 2) {
                oddTurn.acquireUninterruptibly();
                System.out.print(i + " ");
                evenTurn.release();               // hand the turn to the even thread
            }
        });
        Thread t2 = new Thread(() -> {
            for (int i = 2; i <= 10; i += 2) {
                evenTurn.acquireUninterruptibly();
                System.out.print(i + " ");
                oddTurn.release();
            }
        });
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println();
        // 1 2 3 4 5 6 7 8 9 10

        // 3. Three threads, ABCABCABC
        Semaphore[] turns = {new Semaphore(1), new Semaphore(0), new Semaphore(0)};
        Thread[] threads = new Thread[3];
        for (int t = 0; t < 3; t++) {
            int id = t;
            threads[t] = new Thread(() -> {
                for (int round = 0; round < 3; round++) {
                    turns[id].acquireUninterruptibly();
                    System.out.print((char) ('A' + id));
                    turns[(id + 1) % 3].release();
                }
            });
            threads[t].start();
        }
        for (Thread t : threads) t.join();
        System.out.println();
        // ABCABCABC
    }
}
