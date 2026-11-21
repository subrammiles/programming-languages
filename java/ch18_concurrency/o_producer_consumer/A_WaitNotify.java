package ch18_concurrency.o_producer_consumer;

import java.util.LinkedList;
import java.util.Queue;

/*
Producer-consumer with wait() / notifyAll()  (the low-level, interview version)
A producer puts items into a bounded buffer; a consumer takes them out.
  - producer must WAIT when the buffer is full
  - consumer must WAIT when the buffer is empty

Rules for wait/notify:
  1. call them only while holding the object's lock (inside synchronized), or you get
     IllegalMonitorStateException
  2. always wait in a WHILE loop, not an if: a thread can wake up spuriously, or another
     thread may have taken the item first
  3. prefer notifyAll() over notify(), so the right kind of thread is woken
In real code, use a BlockingQueue instead (see B_BlockingQueue.java).
*/
public class A_WaitNotify {

    static class BoundedBuffer {
        private final Queue<Integer> items = new LinkedList<>();
        private final int capacity;

        BoundedBuffer(int capacity) { this.capacity = capacity; }

        synchronized void put(int item) throws InterruptedException {
            while (items.size() == capacity) wait();        // releases the lock while waiting
            items.add(item);
            System.out.println("produced " + item + "  buffer=" + items);
            notifyAll();                                     // wake up waiting consumers
        }

        synchronized int take() throws InterruptedException {
            while (items.isEmpty()) wait();
            int item = items.remove();
            System.out.println("consumed " + item + "  buffer=" + items);
            notifyAll();                                     // wake up waiting producers
            return item;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        BoundedBuffer buffer = new BoundedBuffer(2);

        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) buffer.put(i);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        Thread consumer = new Thread(() -> {
            try {
                int sum = 0;
                for (int i = 1; i <= 5; i++) {
                    sum += buffer.take();
                    Thread.sleep(20);                        // a slow consumer, so the buffer fills up
                }
                System.out.println("sum = " + sum);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();
        producer.join();
        consumer.join();
        // The interleaving varies, but the buffer never holds more than 2 items,
        // every item 1..5 is consumed exactly once, and the last line is:
        // sum = 15
    }
}
