package d_collections.queues;

import java.util.LinkedList;
import java.util.Queue;

public class A_MyLinkedList {

	static void test1() {
		// create linkedlist
		LinkedList<String> animals = new LinkedList<>();
		// Add elements to LinkedList
		animals.add("Dog");
		animals.add("Cat");
		animals.add("Cow");
		System.out.println("LinkedList: " + animals);

	}

	static void test2() {

		/* LinkedList extends Queue and Deque.We can rewrite like this */
		Queue<String> animals = new LinkedList<>();
		// Add elements to LinkedList
		animals.add("Dog");
		animals.add("Cat");
		animals.add("Cow");
		System.out.println("LinkedList: " + animals);

	}

	public static void main(String[] args) {
		test1();
		test2();
	}
}
