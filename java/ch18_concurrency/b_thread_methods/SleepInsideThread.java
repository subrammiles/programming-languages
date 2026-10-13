package e_threads;

public class SleepMethod extends Thread {
	public void run() {
		try {
			Thread.sleep(500);
			System.out.println("After sleep....");
		} catch (InterruptedException e) {
			System.out.println(e);
		}

	}

	public static void main(String args[]) {
		SleepMethod t1 = new SleepMethod();
		t1.start();
		
		
	}
}



