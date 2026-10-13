package e_threads.deadlock;

public class DeadLock {

	public static class SomeObject {
		void display1(SomeObject obj2) {
			System.out.println("Thread1 waiting for thread2 to release lock");
			synchronized (obj2) {
				System.out.println("Deadlock occurred");
			}
		}

		void display2(SomeObject obj1) {
			System.out.println("Thread2 waiting for thread1 to release lock");
			synchronized (obj1) {
				System.out.println("Deadlock occurred");
			}
		}
	}

	public static class Thread1 extends Thread {
		SomeObject obj1, obj2;

		Thread1(SomeObject obj1, SomeObject obj2) {
			this.obj1 = obj1;
			this.obj2 = obj2;
		}

		public void run() {
			synchronized (obj1) {
				try {
					Thread.sleep(1000);
				} catch (InterruptedException ie) {
					System.out.println(ie);
				}
				obj2.display2(obj2);
			}
		}
	}

	public static class Thread2 extends Thread {
		SomeObject obj1, obj2;

		Thread2(SomeObject obj1, SomeObject obj2) {
			this.obj1 = obj1;
			this.obj2 = obj2;
		}

		public void run() {
			synchronized (obj2) {
				try {
					Thread.sleep(1000);
				} catch (InterruptedException ie) {
					System.out.println(ie);
				}
				obj1.display1(obj1);
			}
		}
	}

	public static void main(String[] args) {
		SomeObject obj1 = new SomeObject();
		SomeObject obj2 = new SomeObject();
		Thread1 t1 = new Thread1(obj1, obj2);
		Thread2 t2 = new Thread2(obj1, obj2);
		t1.start();
		t2.start();
	}
}