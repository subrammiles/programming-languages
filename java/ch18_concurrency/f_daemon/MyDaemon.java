package e_threads.deamon;

public class MyDaemon implements Runnable {
	public void run() {
// Checking whether a thread is Daemon or not
		if (Thread.currentThread().isDaemon()) {
			System.out.println(Thread.currentThread() + " is a daemon thread");
		} else {
			System.out.println(Thread.currentThread() + " is a user (normal) thread");
		}
	}

	public static void main(String[] args) {
		MyDaemon obj = new MyDaemon();
		Thread t1 = new Thread(obj, "Thread 1");
		t1.setDaemon(true); // Set to daemon.

		Thread t2 = new Thread(obj, "Thread 2");
		t1.start(); // Execution starts.
		t2.start();

		System.out.println("Main thread ending");
	}
}
