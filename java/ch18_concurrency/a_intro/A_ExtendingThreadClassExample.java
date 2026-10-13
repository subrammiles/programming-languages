package e_threads.a_intro;


/*One way of creating a thread is extending Thread class*/
class MyThread extends Thread {
	/*Thread class implements Runnable*/
	@Override
	public void run() {
		System.out.println("Thread is running...");
	}
}

public class A_ExtendingThreadClassExample {
	public static void main(String args[]) {
		/*Step 1:Create a thread*/
		MyThread t1 = new MyThread();
		//t1 is the instance of Thread
		/*Step 2:Move the thread to runnable state */
		t1.start();
		System.out.println("Main method....");
	}

}
