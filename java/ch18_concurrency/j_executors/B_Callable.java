package e_threads.executors;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;

import e_threads.executors.A_Executor.Task1;
import e_threads.executors.A_Executor.Task2;

/*
 1.The Callable interface is a generic interface.
 2.Callable<V> A task that returns a result and may throw an exception.
 3.containing a single call() method that returns a generic value V:

public interface Callable<V> {
    V call() throws Exception;
}
 * */
public class B_Callable {
	static class Task1 implements Callable {
		@Override
		public String call() {
			//Do some tasks
			return "Work Done";
		}
	}
	public static void main(String[] args) throws InterruptedException, ExecutionException {
		ExecutorService service = Executors.newFixedThreadPool(1);
		Task1 task1 = new Task1();
		Future<String> future = service.submit(task1);
		System.out.println(future.get());
		service.shutdown();
	}

}
