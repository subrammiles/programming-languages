package collections.a_intro;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.PriorityQueue;
import java.util.TreeSet;

public class B_CollectionsIntro {

	static void test1() {
		/* //// Array List //// */
		ArrayList<String> arrayList = new ArrayList<String>();
		arrayList.add("Subbu");
		arrayList.add("Trump");
		System.out.println(arrayList.get(0));

		/* //// Linked List //// */
		LinkedList<String> linkedList = new LinkedList<String>();
		linkedList.add("Subbu");
		linkedList.add("Hello");
		System.out.println(linkedList.get(0));

		/* //// Hash set //// */
		HashSet<String> hashSet = new HashSet<String>();
		hashSet.add("Subbu");

		/* //// Linked Hash Set //// */
		LinkedHashSet<String> linkedHashset = new LinkedHashSet();
		linkedHashset.add("Subbu");

		/* //// Tree set//// */
		TreeSet<Integer> treeSet = new TreeSet<Integer>();
		treeSet.add(23);
		treeSet.add(4);
		System.out.println(treeSet.first());

		/* //// Priority Queue//// */
		PriorityQueue priorityQueue=new PriorityQueue();
		priorityQueue.add("apple");
		System.out.println(priorityQueue.peek());

		/* //// Array  DeQueue//// */
		ArrayDeque arrayDeque=new ArrayDeque(); 
		arrayDeque.add("Subbu");
		

	}

	public static void main(String[] args) {
		test1();
	}

}
