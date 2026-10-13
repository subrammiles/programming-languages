package e_threads.b_thread_methods;

public class SleepMethod {

	public static void main(String[] args) {

		try {
			System.out.println("A");
			Thread.sleep(10000); // sleeps a thread for at least 1000 milliseconds (1 sec).
			System.out.println("B");
		} catch (InterruptedException ie) {
			// catch handler.
		}

	}

}
