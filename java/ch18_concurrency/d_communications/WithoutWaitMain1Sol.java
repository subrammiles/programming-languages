package e_threads.d_communications;

class AccountBalance2 {
	int amount;
	boolean flag = false;
	// flag will be true when data production is over.

	synchronized void deliver(int i) {
		if (flag) {
			try {
				wait();
				/*
				 * Wait till a notification is received from Thread2. There will be no wastage
				 * of time
				 */
			} catch (InterruptedException ie) {
				System.out.println(ie);
			}
		}

		this.amount = i;
		flag = true; // When data production is over, it will store true into flag.
		System.out.println("Data Delivered: " + i);
		notify(); // When data production is over, it will notify Thread2 to use it.
	}

	synchronized void receive() {
		if (!flag) {
			try {
				wait();
				/*
				 * // Wait till a notification is received from Thread1.
				 */
			} catch (InterruptedException ie) {
				System.out.println(ie);
			}
		}
		System.out.println("Data Received: " + amount);
		flag = false; // It will store false into flag when data is received.
		notify(); // When data received is over, it will notify Thread1 to produce next data.
	}
}

public class WithoutWaitMain1Sol {

	public static class Thread1 extends Thread {
		AccountBalance2 obj;
		Thread1(AccountBalance2 obj) {
			this.obj = obj;
		}
		public void run() {
			for (int j = 1; j <= 5; j++) {
				obj.deliver(j);
			}
		}
	}

	public static class Thread2 extends Thread {
		AccountBalance2 obj;

		Thread2(AccountBalance2 obj) {
			this.obj = obj;
		}
		public void run() {
			for (int k = 0; k <= 5; k++) {
				obj.receive();
			}
		}
	}

	public static void main(String[] args) {
		AccountBalance2 obj = new AccountBalance2();
		Thread1 t1 = new Thread1(obj);
		Thread2 t2 = new Thread2(obj);
		t1.start();
		t2.start();
	}

}
