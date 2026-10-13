package e_threads.a_intro;


//2nd way of creating a thread

class MyRunnable implements Runnable {
	@Override
	public void run() {
		System.out.println("Thread is running...");
	}
}

//MyRunnable implemets Runnable interface
public class B_ImplementingThreadRunnableInterface {

	public static void main(String args[]) {
		MyRunnable task = new MyRunnable();
		Thread t1 = new Thread(task);
		t1.start();
	}

}
