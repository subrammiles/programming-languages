package e_threads.b_thread_methods;


/*
 Suppose there are three threads t1, t2, and t3. Thread t1 gets the processor and starts its execution and thread t2 and t3 are in Ready/Runnable state. The completion time for thread t1 is 5 hours and the completion time for t2 is 5 minutes. Since t1 will complete its execution after 5 hours, t2 has to wait for 5 hours to just finish 5 minutes job. In such scenarios where one thread is taking too much time to complete its execution, we need a way to prevent the execution of a thread in between if something important is pending. yield() helps us in doing so. 

The yield() basically means that the thread is not doing anything particularly important and if any other threads or processes need to be run, they should run. Otherwise, the current thread will continue to run.
 * */

class YieldTest1 extends Thread{
	
	public void run() {
		System.out.println(Thread.currentThread());
		Thread.yield(); // Calling yield() method on current thread to move back into the runnable state
						// from running state.
		System.out.println(Thread.currentThread());
	}
	
}
public class YieldTest   {

	
	public static void main(String[] args) {
		YieldTest1 t1 = new YieldTest1();
		t1.setName("YieldTest1");
		YieldTest1 t2 = new YieldTest1();
		t2.setName("YieldTest2");
		t1.setPriority(3);
		t2.setPriority(9);
		t1.start();
		t2.start();
	}

}
