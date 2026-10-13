package d_collections.queues;


import java.util.concurrent.LinkedBlockingQueue;
import java.util.Iterator;
public class MyLinkedBlockingQueue {
	 public static void main(String[] args) {
	        LinkedBlockingQueue<String> animals = new LinkedBlockingQueue<>(5);

	        // Add elements
	        animals.add("Dog");
	        animals.add("Cat");
	        animals.add("Horse");
	        System.out.println("LinkedBlockingQueue: " + animals);

	        // Using peek()
	        String element = animals.peek();
	        System.out.println("Accessed Element: " + element);

	        // Using iterator()
	        Iterator<String> iterate = animals.iterator();
	        System.out.print("LinkedBlockingQueue Elements: ");

	        while(iterate.hasNext()) {
	            System.out.print(iterate.next());
	            System.out.print(", ");
	        }
	    }
}
