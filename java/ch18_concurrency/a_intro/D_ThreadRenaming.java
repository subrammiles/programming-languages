package e_threads.a_intro;



public class D_ThreadRenaming {

	public static void main(String args[]) {
		MyRunnable task = new MyRunnable();
		Thread t1 = new Thread(task);
		t1.setName("Downalod Thread");
		t1.start();

		Thread t2 = new Thread(task);
		t2.setName("UI  Thread");
		t2.start();

	}

	static class MyRunnable implements Runnable {
		@Override
		public void run() {
			System.out.println("This is a new thread ...");
			System.out.println(Thread.currentThread());
		}
	}

}
