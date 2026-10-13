package d_collections.iterators;

import java.util.*;
import java.util.List;

public class ListIteratorExample {

	static void iteratortest1() {

		/* Forword */

		ArrayList<Integer> al = new ArrayList<Integer>();

		al.add(1);
		al.add(2);
		al.add(3);

		ListIterator<Integer> list = al.listIterator();
		while (list.hasNext()) {
			System.out.println(list.next());
		}

	}

	static void iteratortest2() {
		/* Backword */

		ArrayList<Integer> al = new ArrayList<Integer>();

		al.add(10);
		al.add(20);
		al.add(30);

		ListIterator<Integer> list = al.listIterator();

		System.out.println("Forward .....");
		while (list.hasNext()) {
			System.out.println(list.next());
		}
		System.out.println("Backword starts .....");
		while (list.hasPrevious()) {
			System.out.println(list.previous());
		}
		System.out.println("Forward starts .....");
		while (list.hasNext()) {
			System.out.println(list.next());
		}
		System.out.println("Backword starts .....");
		while (list.hasPrevious()) {
			System.out.println(list.previous());
		}

	}

	public static void main(String[] args) {
		iteratortest1();
		iteratortest2();

	}

}
