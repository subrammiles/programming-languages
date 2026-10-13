package e_threads.executors;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class A_Executor {
	static class Task1 extends Thread {
		@Override
		public void run() {
			System.out.println("Do some Task1");
		}
	}
	static class Task2 extends Thread {
		@Override
		public void run() {
			System.out.println("Do some Task2");
		}
	}

	public static void main(String[] args) {
		// Creating a fixed thread pool with max of 2 threads.
		// ExecutorService is an interface
		ExecutorService service = Executors.newFixedThreadPool(2);
		Task1 task1 = new Task1();
		Task2 task2 = new Task2();
		// Add tasks to thread pool.
		service.execute(task1);
		service.execute(task2);
		// Shut down the executor.
		service.shutdown();
	}
}
