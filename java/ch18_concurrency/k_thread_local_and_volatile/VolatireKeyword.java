package e_threads;

import java.util.concurrent.TimeUnit;

/*
 Volatile keyword is used to modify the value of a variable by different threads. 
 It is also used to make classes thread safe.
 * */
public class VolatireKeyword {

	private static volatile boolean stop = false;

	public static void main(String[] args) throws InterruptedException {

		new Thread(() -> {
			while (!stop) {
				System.out.println("Hello");
			}
		}).start();

		TimeUnit.SECONDS.sleep(1);
		stop = true;

	}

}
