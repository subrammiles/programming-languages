package d_collections.iterators;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Foreachloop {

	static void iteratortest1() {
		ArrayList<Integer> list = new ArrayList<Integer>();
		list.add(1);
		list.add(2);
		list.add(3);

		for (Object obj : list) {
			System.out.println(obj);
		}
	}

	static void iteratortest2() {
		/* Lambada expression */
		ArrayList<Integer> list = new ArrayList<Integer>();
		list.add(10);
		list.add(20);
		list.add(30);

		list.forEach(e -> {
			System.out.println(e);
		});
	}
	
	
	static void iteratortest3() {
		/* We can not modify the Collection using for each */
		ArrayList<Integer> list = new ArrayList<Integer>();
		list.add(10);
		list.add(20);
		list.add(30);

		list.forEach(e -> {
			list.remove(Integer.valueOf(e));
		});
	}

	public static void main(String[] args) {
		iteratortest1();
		iteratortest2();
		iteratortest3();

	}

}
