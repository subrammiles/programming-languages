package c_advanced.e_generics.genericclasses;

public class MyGenericMain4<T> {
	private T t;

	public T get() {
		return this.t;
	}

	public void set(T t1) {
		this.t = t1;
	}

	public static void main(String args[]) {
		MyGenericMain4<String> type = new MyGenericMain4<>();
		type.set("Pankaj"); // valid
		MyGenericMain4 type1 = new MyGenericMain4(); // raw type
		type1.set("Pankaj"); // valid
		type1.set(10); // valid and autoboxing support
	}
}
