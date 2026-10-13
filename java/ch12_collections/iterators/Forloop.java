package d_collections.iterators;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Forloop {

	static void iteratortest1() {
		ArrayList list = new ArrayList();
		list.add(1);
		list.add(2);
		list.add(3);

		for (int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i));
		}
	}
	
	
	static void iteratortest2() {
		Map<String,Integer> map = new HashMap<String,Integer>();
	    map.put("one", 1);
	    map.put("two", 2);
		for (int i = 0; i < map.size(); i++) {
			System.out.println(map.values());
		}
	}
	
	
	
	

	public static void main(String[] args) {
		iteratortest1();
		iteratortest2();

	}

}
