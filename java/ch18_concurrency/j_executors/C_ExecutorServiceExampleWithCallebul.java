package e_threads.executors;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class C_ExecutorServiceExampleWithCallebul {

	public static void main(String[] args) throws InterruptedException, ExecutionException {
		ExecutorService executorService = Executors.newSingleThreadExecutor();
		Set<Callable<String>> callableTasks = new HashSet<Callable<String>>();
		callableTasks.add(new Callable<String>() {
			public String call() throws Exception {
				return "Task 1 Output";
			}
		});
		callableTasks.add(new Callable<String>() {
			public String call() throws Exception {
				return "Task 2 Output ";
			}
		});
		callableTasks.add(new Callable<String>() {
			public String call() throws Exception {
				return "Task 3 Output";
			}
		});
		
		List<Future<String>> futures = executorService.invokeAll(callableTasks);

		futures.forEach((Future<String> data)->{
			try {
				System.out.println(data.get().toString());
			} catch (InterruptedException | ExecutionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		});
		executorService.shutdown();
	}

}
