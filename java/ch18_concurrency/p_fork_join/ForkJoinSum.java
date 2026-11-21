package ch18_concurrency.p_fork_join;

import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;
import java.util.stream.LongStream;

/*
Fork/Join framework: divide and conquer on all CPU cores
  - split a big task into smaller subtasks (fork) until they are small enough
  - compute the small ones directly, then combine the results (join)
  - idle threads "steal" queued work from busy threads (work stealing)
RecursiveTask<V> returns a value; RecursiveAction returns nothing.
Parallel streams (ch14) use the common ForkJoinPool under the hood.
*/
public class ForkJoinSum {

    static class SumTask extends RecursiveTask<Long> {
        private static final int THRESHOLD = 10_000;   // below this, just loop
        private final long[] numbers;
        private final int from, to;

        SumTask(long[] numbers, int from, int to) {
            this.numbers = numbers;
            this.from = from;
            this.to = to;
        }

        @Override
        protected Long compute() {
            if (to - from <= THRESHOLD) {
                long sum = 0;
                for (int i = from; i < to; i++) sum += numbers[i];
                return sum;
            }
            int mid = (from + to) >>> 1;
            SumTask left = new SumTask(numbers, from, mid);
            SumTask right = new SumTask(numbers, mid, to);
            left.fork();                          // run the left half asynchronously
            long rightResult = right.compute();   // compute the right half in this thread
            return left.join() + rightResult;     // wait for the left half and combine
        }
    }

    public static void main(String[] args) {
        long[] numbers = LongStream.rangeClosed(1, 10_000_000).toArray();

        long forkJoin = ForkJoinPool.commonPool().invoke(new SumTask(numbers, 0, numbers.length));
        long stream = LongStream.of(numbers).parallel().sum();
        long formula = 10_000_000L * (10_000_000L + 1) / 2;

        System.out.println(forkJoin);                                 // 50000005000000
        System.out.println(forkJoin == stream && stream == formula);  // true
        System.out.println(ForkJoinPool.commonPool().getParallelism() >= 1);   // true   (usually CPU cores - 1)
    }
}
