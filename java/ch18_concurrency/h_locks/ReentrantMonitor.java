package ch18_concurrency.h_locks;

public class ReentrantMonitor {
	public static void main(String args[]) {
		final ReentrantMonitor re = new ReentrantMonitor();

		Thread t1 = new Thread() {
			public void run() {
				//re.main(args);;// calling method of Reentrant class
			}
		};
		t1.start();
	}
}