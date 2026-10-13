package collections.a_intro;

import java.util.ArrayList;
import java.util.Collection;

public class A_CollectionInterface {
	
	static void add() {
		Collection<String> arrayList1 = new ArrayList<String>(5);
		arrayList1.add("Subbu");
		arrayList1.add("Trump");
	}

	public static void main(String[] args) {
		add();
	}

}
