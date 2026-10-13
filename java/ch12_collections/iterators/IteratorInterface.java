package d_collections.iterators;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class IteratorInterface {

	static void iteratortest1() {
		Iterator citiesIterator;
		List<String> list = new ArrayList<String>();
		list.add("G-1");
		list.add("G-2");
		list.add("G-3");
		/* List extends Collections and Collections implememnts Iterator Interface. */
		/*
		 * So List cotains the iterator() method ,this is ingerate from Iterator class
		 */
		citiesIterator = list.iterator();
		while (citiesIterator.hasNext()) {
			System.out.println(citiesIterator.next());
		}

	}
	
	
	static void remove() {
		/*Print even numbers*/
		Iterator iterator;
		ArrayList<Integer> list = new ArrayList<Integer>();
		for(int i=0;i<=10;i++) {
			list.add(i);
		}
		System.out.println(list);
		
		iterator = list.iterator();
		while (iterator.hasNext()) {
			/*Get the current element*/
			Integer i=(Integer) iterator.next();
			if(i %2 !=0) {
				iterator.remove();
			}
		}
		
		System.out.println(list);
	}
	
	

	public static void main(String[] args) {
		iteratortest1();
		remove();

	}

}
