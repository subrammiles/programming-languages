package e_threads.a_intro;


//Main Method is alos run in Main Thread
public class C_MainThread {

	public static void main(String args[]) {

		System.out.println("This is a Main  thread ...");
		System.out.println(Thread.currentThread());

		MyRunnable task = new MyRunnable();
		Thread t1 = new Thread(task);
		t1.start();

	}

	static class MyRunnable implements Runnable {
		@Override
		public void run() {
			System.out.println("This is a new thread ...");
			System.out.println(Thread.currentThread());
		}

	}

}
