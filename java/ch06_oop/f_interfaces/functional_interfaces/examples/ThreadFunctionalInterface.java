package b_oops.e_interfaceexamples.functionalinterface.examples;

public class ThreadFunctionalInterface {

	/* Runnable is a functional interface.It contains 1 method called run */
	public static class Test1 implements Runnable {
		@Override
		public void run() {
			System.out.println("New thread created");
		}
	}

	public static void main(String[] args) {
		System.out.println("I am in Test 1 interface");
		Test1 tes1 = new Test1();
		Thread thread = new Thread(tes1);
		thread.start();
	}

}
