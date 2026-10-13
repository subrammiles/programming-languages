package ch18_concurrency.b_thread_methods;

public class SleepInsideThread extends Thread {
	public void run() {
		try {
			Thread.sleep(500);
			System.out.println("After sleep....");
		} catch (InterruptedException e) {
			System.out.println(e);
		}

	}

	public static void main(String args[]) {
		SleepInsideThread t1 = new SleepInsideThread();
		t1.start();
		
		
	}
}



