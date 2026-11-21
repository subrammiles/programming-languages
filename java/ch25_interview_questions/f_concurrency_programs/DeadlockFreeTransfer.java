package ch25_interview_questions.f_concurrency_programs;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

/*
"Transfer money between accounts from many threads without deadlock."

The deadlock: thread 1 locks A then waits for B, thread 2 locks B then waits for A.
(See ch18_concurrency/e_deadlock for a program that hangs.)

Fix 1: LOCK ORDERING - always lock the account with the smaller id first.
       No cycle of waiting threads can form.
Fix 2: tryLock with a timeout - give up, release, and retry instead of waiting forever.

The four conditions for deadlock (break any one to prevent it):
mutual exclusion, hold and wait, no preemption, circular wait.
*/
public class DeadlockFreeTransfer {

    static class Account {
        final int id;
        private int balance;
        final ReentrantLock lock = new ReentrantLock();
        Account(int id, int balance) { this.id = id; this.balance = balance; }
        int balance() { return balance; }
    }

    // Fix 1: lock ordering
    static void transfer(Account from, Account to, int amount) {
        Account first = from.id < to.id ? from : to;
        Account second = from.id < to.id ? to : from;
        synchronized (first) {
            synchronized (second) {
                if (from.balance >= amount) {
                    from.balance -= amount;
                    to.balance += amount;
                }
            }
        }
    }

    // Fix 2: tryLock with timeout and retry
    static boolean tryTransfer(Account from, Account to, int amount) throws InterruptedException {
        while (true) {
            if (from.lock.tryLock(10, TimeUnit.MILLISECONDS)) {
                try {
                    if (to.lock.tryLock(10, TimeUnit.MILLISECONDS)) {
                        try {
                            if (from.balance < amount) return false;
                            from.balance -= amount;
                            to.balance += amount;
                            return true;
                        } finally {
                            to.lock.unlock();
                        }
                    }
                } finally {
                    from.lock.unlock();
                }
            }
            Thread.sleep(1);                            // back off before retrying
        }
    }

    public static void main(String[] args) {
        Account a = new Account(1, 1000), b = new Account(2, 1000);

        try (ExecutorService pool = Executors.newFixedThreadPool(8)) {
            for (int i = 0; i < 10_000; i++) {
                pool.submit(() -> transfer(a, b, 1));   // A -> B
                pool.submit(() -> transfer(b, a, 1));   // B -> A at the same time: would deadlock without ordering
            }
        }
        System.out.println(a.balance() + " + " + b.balance() + " = " + (a.balance() + b.balance()));   // ... = 2000

        try (ExecutorService pool = Executors.newFixedThreadPool(8)) {
            for (int i = 0; i < 1_000; i++) {
                pool.submit(() -> tryTransfer(a, b, 1));
                pool.submit(() -> tryTransfer(b, a, 1));
            }
        }
        System.out.println("total still " + (a.balance() + b.balance()));   // total still 2000
        System.out.println("finished without deadlock");                     // finished without deadlock
    }
}
